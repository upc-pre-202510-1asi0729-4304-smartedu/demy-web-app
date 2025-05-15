import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import{TranslatePipe} from '@ngx-translate/core';
/**
 * A standalone component that allows users to select a date
 * for an attendance session using Angular Material's datepicker.
 *
 * It supports internationalization via `ngx-translate`.
 */
@Component({
  selector: 'app-attendance-date',
  standalone: true,
  templateUrl: './attendance-date.component.html',
  styleUrls: ['./attendance-date.component.css'],
  imports: [
    TranslatePipe,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule
  ]
})

/**
 * Standalone component that allows users to select a date
 * for an attendance session using Angular Material's datepicker.
 *
 * Supports internationalization via `ngx-translate`.
 * The selected date can be used to create or filter attendance sessions.
 */
export class AttendanceDateComponent {
  /**
   * The date currently selected by the user.
   * This value is intended to be used for creating or filtering
   * attendance sessions by a specific date.
   */
  selectedDate: Date | null = null;
}
