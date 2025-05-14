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

/**
 * Page component responsible for managing attendance registration.
 *
 * It integrates subcomponents for date selection, student listing,
 * class selection, and saving the session. It handles the logic
 * for fetching and updating `ClassSession` entities.
 */
@Component({
  selector: 'app-attendance-page',
  imports: [
    TranslatePipe,
    AttendanceDateComponent,
    StudentListComponent,
    AttendanceClassSelectComponent,
    AttendanceSaveButtonComponent
  ],
  templateUrl: './attendance-page.component.html',
  styleUrl: './attendance-page.component.css',
  providers: [ClassSessionService]
})
/**
 * The current class session being managed. May be null before data is loaded.
 */
export class AttendancePageComponent implements OnInit {
  private attendanceRecordService = inject(AttendanceRecordService);
  classSession: ClassSession | null = null;

  constructor(private classSessionService: ClassSessionService) {}
  /**
   * Lifecycle hook that initializes the component.
   * Loads existing class sessions and selects the first one if available.
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
   * Updates the attendance status of a specific student in the current session.
   *
   * @param studentId - The ID of the student whose status has changed
   * @param status - The new attendance status (PRESENT, ABSENT, etc.)
   */

  onStatusChange(studentId: string, status: AttendanceStatus): void {
    if (!this.classSession) return;

    const record = this.classSession.getAttendance().find(r => r.studentId === studentId);
    if (record) record.status = status;
  }
  /**
   * Saves the current class session to the backend using the session service.
   */
  onSave(): void {
    if (!this.recordsBuffer.length) return;

    this.attendanceRecordService.saveMany(this.recordsBuffer);

    this.studentListComponent.resetAttendance();
  }

  /**
   * Updates the session's attendance records when changes are received from the student list.
   * Converts boolean attendance values into `AttendanceRecord` instances.
   *
   * @param records - Array of attendance data per student (with `attended` as a boolean)
   */
  recordsBuffer: AttendanceRecord[] = [];

  onAttendanceChanged(records: { studentId: string; attended: boolean }[]): void {
    this.recordsBuffer = records.map(
      r => new AttendanceRecord(r.studentId, r.attended ? AttendanceStatus.PRESENT : AttendanceStatus.ABSENT)
    );
  }
  /**
   * Reference to the StudentListComponent instance rendered in the template.
   *
   * Used to call public methods of the child component such as resetting attendance checkboxes.
   *
   * @remarks
   * This reference is only available after the view has been fully initialized
   */
  @ViewChild(StudentListComponent)
  studentListComponent!: StudentListComponent;
}
