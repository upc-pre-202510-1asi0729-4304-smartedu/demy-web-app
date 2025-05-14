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
 * Displays a list of students in a table format and allows toggling attendance using checkboxes.
 * Emits an event when attendance changes.
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
   * Event emitted when attendance data is modified.
   * Emits an array of objects containing student ID and attendance status.
   */
  @Output() attendanceChanged = new EventEmitter<{ studentId: string, attended: boolean }[]>();
  /**
   * Columns to display in the material table.
   */

  displayedColumns: string[] = ['dni', 'name', 'attended'];

  /**
   * Data source for the student list table.
   */
  students = new MatTableDataSource<AttendanceStudent>([]);
  /**
   * Reference to the paginator component.
   */
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  /**
   * Injects the attendance student service used to fetch student data.
   * @param attendanceStudentService - Service to retrieve student list for attendance.
   */
  constructor(private attendanceStudentService: AttendanceStudentService) {}
  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   * Retrieves the list of students and populates the table.
   */
  ngOnInit(): void {
    this.attendanceStudentService.getForAttendance().subscribe(data => {
      this.students.data = data;
    });
  }
  /**
   * Lifecycle hook that is called after the component's view has been fully initialized.
   * Assigns the paginator to the data source.
   */
  ngAfterViewInit(): void {
    this.students.paginator = this.paginator;
  }
  /**
   * Emits the current attendance state for all students in the table.
   * Called when a checkbox is toggled.
   */
  toggleAttendance() {
    const updated = this.students.data.map(s => ({
      studentId: s.id,
      attended: s.attended
    }));
    this.attendanceChanged.emit(updated);
  }
  /**
   * Resets the attendance status for all students to false
   * and refreshes the table data.
   */
  resetAttendance(): void {
    this.students.data.forEach(s => s.attended = false);
    this.students.data = [...this.students.data];

  }

}
