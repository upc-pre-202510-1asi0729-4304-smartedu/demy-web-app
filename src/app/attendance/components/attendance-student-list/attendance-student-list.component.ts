import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import{NgClass} from '@angular/common';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import{TranslatePipe} from '@ngx-translate/core';
/**
 * A standalone component that displays a list of students
 * with checkboxes to mark their attendance.
 *
 * Includes pagination and emits attendance data changes to the parent component.
 */

@Component({
  selector: 'app-student-list',
  templateUrl: './attendance-student-list.component.html',
  styleUrls: ['./attendance-student-list.component.css'],
  standalone: true,
  imports: [
    TranslatePipe,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatCardModule,
    NgClass,
  ]
})
export class StudentListComponent {
/**
 * Event emitted when attendance values change.
 * Sends an array of student attendance records to the parent component.
 */

  @Output() attendanceChanged = new EventEmitter<{ studentId: string, attended: boolean }[]>();
  /**
   * Columns displayed in the table: DNI, name, and attendance checkbox.
   */
  displayedColumns: string[] = ['dni', 'name', 'attended'];
  /**
   * Data source for the table containing the list of students.
   */
  students = new MatTableDataSource<Student>([
    { dni: '73592814', name: 'Rahy Contreras', attended: true },
    { dni: '60234781', name: 'Monica Torres', attended: true },
    { dni: '89471325', name: 'Mariel Tiza', attended: false },
    { dni: '14829573', name: 'Rodrigo Ccahuana', attended: false },
    { dni: '27951468', name: 'Alfonzo Quispe', attended: true },
  ]);
  /**
   * Reference to the paginator instance used by Angular Material.
   */
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  /**
   * Initializes the paginator after the view is loaded.
   */
  ngAfterViewInit() {
    this.students.paginator = this.paginator;
  }
  /**
   * Collects the current attendance state and emits it
   * to the parent component via `attendanceChanged`.
   */

  emitAttendance() {
    const attendance = this.students.data.map(s => ({
      studentId: s.dni,
      attended: s.attended
    }));
    this.attendanceChanged.emit(attendance);
  }

}
/**
 * Interface representing a student record with attendance information.
 */

interface Student {
  dni: string;
  name: string;
  attended: boolean;
}
