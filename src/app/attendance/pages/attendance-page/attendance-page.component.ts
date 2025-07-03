import { Component, OnInit } from '@angular/core';
import { AttendanceDateComponent } from '../../components/attendance-date/attendance-date.component';
import { StudentListComponent } from '../../components/attendance-student-list/attendance-student-list.component';
import { AttendanceClassSelectComponent } from '../../components/attendance-class-select/attendance-class-select.component';
import { AttendanceSaveButtonComponent } from '../../components/attendance-save-button/attendance-save-button.component';
import { TranslatePipe } from '@ngx-translate/core';

import { ClassSession } from '../../model/class-session.entity';
import { AttendanceStatus } from '../../model/attendance-status.enum';
import { ClassSessionService } from '../../services/class-session.service';
import{AttendanceRecord} from '../../model/attendance-record.entity';
import { ViewChild } from '@angular/core';
import { inject } from '@angular/core';
import { AttendanceRecordService } from '../../services/attendance-record.service';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatSnackBar } from '@angular/material/snack-bar';


/**
 * Page component responsible for managing attendance registration.
 *
 * This component coordinates the entire attendance flow:
 * - Selecting a date and course.
 * - Listing students with checkboxes.
 * - Saving attendance records.
 * It integrates reusable subcomponents and handles the logic
 * for transforming attendance data and interacting with backend services.
 */
@Component({
  selector: 'app-attendance-page',
  imports: [
    TranslatePipe,
    AttendanceDateComponent,
    StudentListComponent,
    AttendanceClassSelectComponent,
    AttendanceSaveButtonComponent,
    MatSnackBarModule
  ],
  templateUrl: './attendance-page.component.html',
  styleUrl: './attendance-page.component.css',
  providers: [ClassSessionService]
})

export class AttendancePageComponent implements OnInit {
  /**
   * The current {@link ClassSession} being managed.
   * May be `null` before session data is loaded.
   */
  classSession: ClassSession | null = null;
  selectedClassId: string | null = null;

  private snackBar = inject(MatSnackBar);

  /**
   * Temporary buffer of attendance records to be saved.
   * Populated by the student list component via `onAttendanceChanged`.
   */
  recordsBuffer: AttendanceRecord[] = [];

  selectedDate: Date | null = null;

  /**
   * Reference to the student list component in the template.
   * Used to call methods like `resetAttendance()` after saving.
   *
   * @remarks This reference becomes available after the view is fully initialized.
   */
  @ViewChild(StudentListComponent)
  studentListComponent!: StudentListComponent;

  private attendanceRecordService = inject(AttendanceRecordService);

  /**
   * Injects required services for class session management and attendance saving.
   */
  constructor(private classSessionService: ClassSessionService) {}

  /**
   * Lifecycle hook called after component initialization.
   * Loads existing class sessions and selects the first one, or creates a new session if none exist.
   */
  ngOnInit(): void {
    this.classSessionService.getAll().subscribe({
      next: sessions => {
        this.classSession = sessions.length > 0 ? sessions[0] : new ClassSession('');
      },
      error: err => console.error('Error al cargar sesiones:', err)
    });
  }

  /**
   * Saves the buffered attendance records to the backend.
   * Then resets the student list to prepare for a new session.
   */

  onDateChanged(date: Date): void {
    this.selectedDate = date;
  }

  onClassChanged(classId: string): void {
    this.selectedClassId = classId;
  }

  onSave(): void {
    console.log('onSave() disparado');
    console.log('selectedDate:', this.selectedDate);
    console.log('selectedClassId:', this.selectedClassId);
    console.log('recordsBuffer:', this.recordsBuffer);

    if (!this.selectedDate || !this.selectedClassId || !this.recordsBuffer.length) {
      const missing = [];

      if (!this.selectedDate) missing.push('una fecha');
      if (!this.selectedClassId) missing.push('una clase');
      if (!this.recordsBuffer.length) missing.push('al menos un estudiante');

      const message = `Debe seleccionar ${missing.join(' y ')} antes de guardar.`;

      this.snackBar.open(message, 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['custom-snackbar']
      });
      return;
    }

    const newSession = new ClassSession(
      '',
      this.recordsBuffer,
      this.selectedDate,
      this.selectedClassId
    );

    this.classSessionService.create(newSession).subscribe({
      next: session => {
        console.log('Sesión guardada:', session);
        this.classSession = session;
        this.studentListComponent.resetAttendance();

        this.snackBar.open('¡Sesión guardada con éxito!', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['custom-snackbar']
        });
      },
      error: err => {
        console.error('Error al guardar sesión:', err);
        this.snackBar.open('Error al guardar sesión', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['custom-snackbar']
        });
      }
    });
  }



  /**
   * Receives updated attendance data from the student list component.
   * Converts raw attendance (boolean) into {@link AttendanceRecord} instances.
   *
   * @param records - Array of objects with `studentId` and `attended` status.
   */
  onAttendanceChanged(records: { studentId: string; attended: boolean }[]): void {
    // Convertimos a AttendanceRecord[]
    const rawRecords = records.map(
      r => new AttendanceRecord(
        r.studentId,
        r.attended ? AttendanceStatus.PRESENT : AttendanceStatus.ABSENT
      )
    );

    // Eliminamos duplicados conservando el último por studentId
    const uniqueRecords = Array.from(
      new Map(rawRecords.map(r => [r.studentId, r])).values()
    );

    this.recordsBuffer = uniqueRecords;
  }

}
