import { Component, EventEmitter, Output, ViewChild, OnInit ,AfterViewInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { AttendanceStudentService, AttendanceStudent } from '../../services/attendance-student.service';
import {MatCheckbox} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import{TranslatePipe} from '@ngx-translate/core';

/**
 * Standalone component that displays a paginated list of students for attendance tracking.
 * Allows toggling each student's attendance status using checkboxes,
 * and emits the updated data to the parent component.
 */
@Component({
  selector: 'app-student-list',
  templateUrl: './attendance-student-list.component.html',
  styleUrls: ['./attendance-student-list.component.css'],
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatCheckbox,
    MatHeaderRow,
    MatRow,
    FormsModule,
    MatHeaderCellDef,
    MatRowDef,
    MatHeaderRowDef,
    MatPaginator,
    TranslatePipe
  ],

})
export class StudentListComponent implements OnInit {

  /**
   * Event emitted when attendance data is updated.
   * Emits an array of objects containing each student's ID and attendance status.
   */
  @Output() attendanceChanged = new EventEmitter<{ dni: string; attended: boolean }[]>();


  /**
   * List of column identifiers used in the Material table.
   */
  displayedColumns: string[] = ['dni', 'name', 'attended'];

  /**
   * Data source for the student table.
   * Each row represents a {@link AttendanceStudent} instance.
   */
  students = new MatTableDataSource<AttendanceStudent>([]);

  /**
   * Reference to the Angular Material paginator.
   */
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /**
   * Injects the {@link AttendanceStudentService} used to retrieve student data.
   *
   * @param attendanceStudentService - The service that fetches student records prepared for attendance.
   */
  constructor(private attendanceStudentService: AttendanceStudentService) {}

  /**
   * Lifecycle hook called after component initialization.
   * Fetches student data and populates the table.
   */
  ngOnInit(): void {
    this.attendanceStudentService.getForAttendance().subscribe(data => {
      this.students.data = data;
    });
  }

  /**
   * Lifecycle hook called after the view has been fully initialized.
   * Binds the paginator to the table data source.
   */
  ngAfterViewInit(): void {
    this.students.paginator = this.paginator;
  }

  /**
   * Emits the current attendance status of all students in the table.
   * This method should be called whenever a checkbox is toggled.
   */
  toggleAttendance() {
    const updated = this.students.data.map(s => ({
      dni: s.dni,
      attended: s.attended
    }));

    this.attendanceChanged.emit(updated);
  }

  /**
   * Resets the attendance status of all students to `false`
   * and refreshes the table to reflect the changes.
   */
  resetAttendance(): void {
    this.students.data.forEach(s => s.attended = false);
    this.students.data = [...this.students.data];
  }
}
