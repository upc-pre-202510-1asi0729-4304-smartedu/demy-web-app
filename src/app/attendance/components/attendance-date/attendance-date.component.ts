import { Component, EventEmitter, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * A standalone component that allows users to select a date
 * for an attendance session using Angular Material's datepicker.
 */
@Component({
  selector: 'app-attendance-date',
  standalone: true,
  templateUrl: './attendance-date.component.html',
  styleUrls: ['./attendance-date.component.css'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
    TranslatePipe
  ]
})
export class AttendanceDateComponent {
  selectedDate: Date | null = null;

  @Output() dateChanged = new EventEmitter<Date>();

  onDateChange(date: Date | null): void {
    this.selectedDate = date;
    if (date) {
      this.dateChanged.emit(date);
    }
  }
}
