import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {Student} from '../../../enrollments/model/student.entity';
import {TranslatePipe} from '@ngx-translate/core';
import {Invoice} from '../../model/invoice.entity';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-student-status',
  imports: [
    MatTableModule,
    MatButtonModule,
    TranslatePipe,
    DatePipe
  ],
  templateUrl: './student-status.component.html',
  styleUrl: './student-status.component.css'
})
export class StudentStatusComponent {
  @Input() data!: Invoice[];

  @Input() student!: Student;

  @Output() registerPaymentRequested = new EventEmitter<Invoice>();

  displayedColumns = ['dni', 'name', 'amount', 'status', 'dueDate', 'action'];
}

export interface StudentPaymentStatus {
  student: Student;
  invoices: Invoice[];
}

