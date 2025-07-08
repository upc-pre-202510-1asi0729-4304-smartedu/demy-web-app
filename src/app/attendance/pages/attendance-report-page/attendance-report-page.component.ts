import { Component, ViewChild, AfterViewChecked, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceClassSelectComponent } from '../../components/attendance-class-select/attendance-class-select.component';
import { AttendanceStudentSelectComponent } from '../../components/attendance-student-select/attendance-student-select.component';
import { AttendanceDateRangePickerComponent } from '../../components/attendance-date-range-picker/attendance-date-range-picker.component';
import { TranslatePipe } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClassSessionService } from '../../services/class-session.service';
import { AttendanceStudentService } from '../../services/attendance-student.service';
import { ClassSession } from '../../model/class-session.entity';
import {AttendanceReport} from '../../model/attendance-report.entity';
import {AttendanceReportService} from '../../services/attendance-report.service';
import {MatButton} from '@angular/material/button';
/**
 * Component for displaying the attendance report page.
 * Allows filtering by class, student, and date range,
 * and shows a table of attendance records.
 *
 * @example
 * <app-attendance-report-page></app-attendance-report-page>
 */
@Component({
  selector: 'app-attendance-report-page',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    TranslatePipe,
    AttendanceClassSelectComponent,
    AttendanceStudentSelectComponent,
    AttendanceDateRangePickerComponent,
    MatTableModule,
    MatPaginatorModule,
    MatButton
  ],
  templateUrl: './attendance-report-page.component.html',
  styleUrl: './attendance-report-page.component.css'
})
export class AttendanceReportPageComponent {
  /** Paginator for the attendance records table */
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /** Data source for the attendance records table */
  dataSource = new MatTableDataSource<AttendanceReport>();

  /** Columns displayed in the attendance table */
  columns: string[] = ['dni', 'studentName', 'status', 'date'];

  /** Flag indicating if the search has been performed */
  hasSearched = false;

  selectedClassId: number | null = null;
  selectedStudentId: string = '';
  selectedDateRange: { start: Date; end: Date } | null = null;

  constructor(private attendanceReportService: AttendanceReportService) {}

  onClassChanged(classId: number): void {
    this.selectedClassId = classId;
  }

  onStudentChanged(studentId: string): void {
    this.selectedStudentId = String(studentId);
  }

  onDateRangeChanged(range: { start: Date; end: Date }): void {
    this.selectedDateRange = range;
  }

  /**
   * Executes the search for the attendance report based on selected filters.
   * Validates the filters before sending the request.
   */
  onSearchReport(): void {
    if (!this.selectedDateRange || !this.selectedClassId || !this.selectedStudentId) {
      console.warn('All filters must be selected');
      return;
    }
    if (!this.selectedStudentId || this.selectedStudentId.length !== 8) {
      console.error('DNI inválido');
      return;
    }


    this.hasSearched = true;

    const startDate = this.selectedDateRange.start.toISOString().split('T')[0];
    const endDate = this.selectedDateRange.end.toISOString().split('T')[0];

    this.attendanceReportService.getReport(
      this.selectedStudentId,
      +this.selectedClassId,
      startDate,
      endDate
    ).subscribe({
      next: report => {
        this.dataSource.data = report.attendance;
        this.dataSource.paginator = this.paginator;
      },
      error: () => {
        console.error('Error loading report');
        this.dataSource.data = [];
      }
    });
  }
}


