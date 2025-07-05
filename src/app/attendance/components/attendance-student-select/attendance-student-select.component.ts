import { Component, EventEmitter, Output, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { AttendanceStudentService, AttendanceStudent } from '../../services/attendance-student.service';

/**
 * Component for selecting a student from a list of available students.
 * Fetches students from the backend and emits the selected student's ID (DNI).
 *
 * @example
 * <app-attendance-student-select
 *   (studentChanged)="onStudentChanged($event)">
 * </app-attendance-student-select>
 */
@Component({
  selector: 'app-attendance-student-select',
  standalone: true,
  templateUrl: './attendance-student-select.component.html',
  styleUrls: ['./attendance-student-select.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    TranslatePipe
  ]
})
export class AttendanceStudentSelectComponent {
  /**
   * Reactive signal holding the list of students to display in the select.
   * Each student is mapped to an object with `label` (name) and `value` (DNI).
   */

  students = signal<{ label: string; value: string }[]>([]);


  /**
   * Reactive signal holding the currently selected student's DNI.
   */
  selectedStudentId: WritableSignal<string> = signal('');

  @Output() studentChanged = new EventEmitter<string>();

  constructor(private attendanceStudentService: AttendanceStudentService) {}
  /**
   * Lifecycle hook that runs after component initialization.
   * Loads the list of students from the backend service.
   */
  ngOnInit(): void {
    this.attendanceStudentService.getForAttendance().subscribe({
      next: (res: AttendanceStudent[]) => {
        const mapped = res.map(s => ({
          label: s.name,
          value: s.dni
        }));
        this.students.set(mapped);
      },
      error: err => console.error('Error cargando alumnos:', err)
    });
  }

  get selectedId(): string {
    return this.selectedStudentId();
  }
  /**
   * Handles selection changes from the UI.
   * Sets the new selected student ID and emits the change.
   *
   * @param value The newly selected student's DNI.
   */
  onSelect(value: string): void {
    this.selectedStudentId.set(value);
    this.studentChanged.emit(value);
  }


  set selectedId(value: string) {
    this.selectedStudentId.set(value);
    this.studentChanged.emit(value);
  }
}
