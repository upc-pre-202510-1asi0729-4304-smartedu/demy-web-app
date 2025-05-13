import {Component, signal} from '@angular/core';
import {StudentSearchComponent} from '../../components/student-search/student-search.component';
import {StudentPaymentStatus, StudentStatusComponent} from '../../components/student-status/student-status.component';
import {StudentService} from '../../../enrollments/services/student.service';
import {TranslatePipe} from '@ngx-translate/core';
import {InvoiceService} from '../../services/invoice.service';
import {PaymentRegistrationComponent} from '../../components/payment-registration/payment-registration.component';
import {PaymentService} from '../../services/payment.service';
import {Invoice, PaymentStatus} from '../../model/invoice.entity';
import {FinancialTransactionService} from '../../services/financial-transaction.service';
import {FinancialTransaction, PartyType} from '../../model/financial-transaction.entity';

@Component({
  selector: 'app-payments',
  imports: [
    StudentSearchComponent,
    StudentStatusComponent,
    TranslatePipe,
    PaymentRegistrationComponent
  ],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent {
  studentPaymentStatus = signal<StudentPaymentStatus | null>(null);

  selectedInvoice = signal<Invoice | null>(null);

  showPaymentForm = signal(false);

  constructor(private studentService: StudentService,
              private invoiceService: InvoiceService,
              private paymentService: PaymentService,
              private transactionService: FinancialTransactionService
  ) {}

  onSearch(dni: string) {
    this.studentService.getByDni(dni).subscribe({
      next: students => {
        if (students.length > 0) {
          const student = students[0];
          this.invoiceService.getByStudentId(student.id).subscribe({
            next: invoices => {
              this.studentPaymentStatus.set({ student, invoices });
            }
          });
        }
      },
      error: err => console.error('Error en búsqueda', err)
    });
  }

  onRegisterPaymentRequest(invoice: Invoice) {
    this.selectedInvoice.set(invoice);
    this.showPaymentForm.set(true);
  }

  onPaymentRegistered(paymentData: { amount: number; paidAt: Date }) {
    const invoice = this.selectedInvoice();
    const status = this.studentPaymentStatus();
    if (!status || !invoice) return;

    const payment = {
      invoiceId: invoice.id,
      amount: paymentData.amount,
      paidAt: paymentData.paidAt,
      method: 'CASH'
    };

    this.paymentService.create(payment).subscribe({
      next: (createdPayment) => {
        console.log('Pago registrado correctamente');
        this.showPaymentForm.set(false);

        const transaction = new FinancialTransaction({
          source: PartyType.STUDENT,
          target: PartyType.ACADEMY,
          type: 'INCOME',
          category: 'Pago de mensualidad',
          concept: 'Pago de mensualidad',
          date: new Date(),
          reference: `TX-${Date.now()}`,
          amount: createdPayment.amount,
          method: createdPayment.method
        });

        this.transactionService.create(transaction).subscribe({
          next: () => console.log('Transacción registrada automáticamente'),
          error: err => console.error('Error al registrar transacción', err)
        });

        const updatedInvoice: Invoice = { ...invoice, status: PaymentStatus.PAID };

        this.invoiceService.update(invoice.id, updatedInvoice).subscribe(() => {
          this.studentPaymentStatus.set({
            ...status,
            invoices: status.invoices.map((inv: Invoice) =>
              inv.id === invoice.id ? updatedInvoice : inv
            )
          });
        });
      },
      error: err => console.error('Error al registrar el pago', err)
    });
  }
}
