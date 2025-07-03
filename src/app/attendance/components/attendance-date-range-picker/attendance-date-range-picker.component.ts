import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-attendance-date-range-picker',
  standalone: true,
  templateUrl: './attendance-date-range-picker.component.html',
  styleUrls: ['./attendance-date-range-picker.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    TranslatePipe,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule
  ]
})
export class AttendanceDateRangePickerComponent {
  range = signal<{ start: Date | null; end: Date | null }>({ start: null, end: null });

  @Output() dateRangeChanged = new EventEmitter<{ start: Date; end: Date }>();

  onStartChange(date: Date | null): void {
    const updated = { ...this.range(), start: date };
    this.range.set(updated);
    this.emitIfComplete(updated);
  }

  onEndChange(date: Date | null): void {
    const updated = { ...this.range(), end: date };
    this.range.set(updated);
    this.emitIfComplete(updated);
  }

  private emitIfComplete(range: { start: Date | null; end: Date | null }): void {
    if (range.start && range.end) {
      this.dateRangeChanged.emit({ start: range.start, end: range.end });
    }
  }
}
