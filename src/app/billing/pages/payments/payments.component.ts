import {Component, inject, signal} from '@angular/core';
import {StudentSearchComponent} from '../../components/student-search/student-search.component';
import {StudentPaymentStatus, StudentStatusComponent} from '../../components/student-status/student-status.component';
import {StudentService} from '../../../enrollments/services/student.service';
import {TranslatePipe} from '@ngx-translate/core';
import {InvoiceService} from '../../services/invoice.service';
import {PaymentRegistrationComponent} from '../../components/payment-registration/payment-registration.component';
import {PaymentService} from '../../services/payment.service';
import {Invoice, PaymentStatus} from '../../model/invoice.entity';
import {FinancialTransactionService} from '../../services/financial-transaction.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {NotificationService} from '../../../shared/services/notification.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-payments',
  imports: [
    StudentSearchComponent,
    StudentStatusComponent,
    TranslatePipe,
    PaymentRegistrationComponent,
    MatSnackBarModule
  ],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent {
  private notification = inject(NotificationService);
  private translate = inject(TranslateService);
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
        console.log('Student search result:', students);

        // Filtra para encontrar solo el que coincida exacto
        const student = students.find(s => s.dni === dni);

        if (!student) {
          this.notification.showError(this.translate.instant('common.student-not-found'));
          return;
        }

        this.invoiceService.getByDni(student.dni).subscribe({
          next: invoices => {
            this.studentPaymentStatus.set({ student, invoices });
          }
        });
      },
      error: err => console.error('Error en búsqueda', err)
    });
  }

  onRegisterPaymentRequest(invoice: Invoice) {
    this.selectedInvoice.set(invoice);
    this.showPaymentForm.set(true);
  }
  onPaymentRegistered(method: string) {
    const invoice = this.selectedInvoice();
    const status = this.studentPaymentStatus();
    if (!status || !invoice) return;

    this.paymentService.registerPayment(invoice.id, method).subscribe({
      next: () => {
        console.log('Pago registrado correctamente');

        this.notification.showSuccess(
          this.translate.instant('payments.register.success')
        );

        // Oculta el formulario
        this.showPaymentForm.set(false);

        // Marca la factura como pagada localmente
        const updatedInvoice = new Invoice({
          id: invoice.id,
          dni: invoice.dni,
          name: invoice.name,
          amount: invoice.amount.amount,
          currency: invoice.amount.currency.code,
          dueDate: invoice.dueDate.toString(),
          status: PaymentStatus.PAID
        });

        // Actualiza el signal local
        this.studentPaymentStatus.set({
          ...status,
          invoices: status.invoices.map((inv: Invoice) =>
            inv.id === invoice.id ? updatedInvoice : inv
          )
        });
      },
      error: (err) => {
        console.error('Error al registrar el pago', err);
        this.notification.showError(
          this.translate.instant('payments.register.error')
        );
      }
    });
  }
}
