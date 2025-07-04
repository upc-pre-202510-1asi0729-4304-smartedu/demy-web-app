import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {Student} from '../../../enrollments/model/student.entity';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {Invoice} from '../../model/invoice.entity';

/**
 * Displays the list of invoices associated with a specific student,
 * allowing the user to view their payment status and trigger a payment registration action.
 */
@Component({
  selector: 'app-student-status',
  imports: [
    MatTableModule,
    MatButtonModule,
    TranslatePipe
  ],
  templateUrl: './student-status.component.html',
  styleUrl: './student-status.component.css'
})
export class StudentStatusComponent {
  /**
   * List of invoices associated with the selected student.
   */
  @Input() data!: Invoice[];

  /**
   * Student whose payment status is being displayed.
   */
  @Input() student!: Student;

  /**
   * Event emitted when the user requests to register a payment for a specific invoice.
   */
  @Output() registerPaymentRequested = new EventEmitter<Invoice>();

  /**
   * Defines the columns to be displayed in the Material table.
   */
  displayedColumns = ['dni', 'name', 'amount', 'status', 'dueDate', 'action'];

  constructor(private translate: TranslateService) {}

  get currentLocale(): string {
    return this.translate.currentLang || 'es-PE';
  }
}

/**
 * Combines a student and their associated invoices.
 * Used to represent the payment status of a student in a single structure.
 */
export interface StudentPaymentStatus {
  /**
   * The student being represented.
   */
  student: Student;

  /**
   * List of invoices issued to the student.
   */
  invoices: Invoice[];
}
