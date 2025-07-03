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
    MatPaginatorModule
  ],
  templateUrl: './attendance-report-page.component.html',
  styleUrl: './attendance-report-page.component.css'
})
export class AttendanceReportPageComponent implements AfterViewChecked, OnInit {
  private paginatorInitialized = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<any>();
  selectedClassId: string = '';
  selectedStudentId: string = '';
  selectedDateRange: { start: Date; end: Date } | null = null;
  hasSearched = false;

  columns: string[] = ['name'];
  dateColumns: { key: string, label: string }[] = [];
  studentsMap: { [id: string]: string } = {};
  allSessions: ClassSession[] = [];

  constructor(
    private classSessionService: ClassSessionService,
    private studentService: AttendanceStudentService
  ) {}

  ngOnInit(): void {
    this.studentService.getForAttendance().subscribe(students => {
      this.studentsMap = Object.fromEntries(
        students.map(s => [s.id, s.name])
      );
    });
  }

  ngAfterViewChecked(): void {
    if (!this.paginatorInitialized && this.paginator) {
      this.dataSource.paginator = this.paginator;
      this.paginatorInitialized = true;
    }
  }

  onClassChanged(classId: string): void {
    this.selectedClassId = classId;
  }

  onStudentChanged(studentId: string): void {
    this.selectedStudentId = studentId;
  }

  onDateRangeChanged(range: { start: Date; end: Date }): void {
    this.selectedDateRange = range;
  }

  onSearchReport(): void {
    console.log('Buscar reporte con filtros actuales:');
    console.log('Clase:', this.selectedClassId);
    console.log('Estudiante:', this.selectedStudentId);
    console.log('Rango de fechas:', this.selectedDateRange);
    this.hasSearched = true;

    if (!this.selectedDateRange) return;

    const { start, end } = this.selectedDateRange;
    const dates: { key: string, label: string }[] = [];
    const current = new Date(start);

    while (current <= end) {
      const key = current.toISOString().split('T')[0]; // YYYY-MM-DD
      const label = current.toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit' });
      dates.push({ key, label });
      current.setDate(current.getDate() + 1);
    }

    this.classSessionService.getAll().subscribe(sessions => {
      // Filtrar por rango de fechas y clase (si aplica)
      let filteredSessions = sessions.filter(s => {
        const date = s.createdAt ? new Date(s.createdAt).toISOString().split('T')[0] : '';
        return (
          date &&
          date >= dates[0].key &&
          date <= dates[dates.length - 1].key &&
          (!this.selectedClassId || s.classId === this.selectedClassId)
        );
      });

      // Obtener los studentIds válidos (que están en el mapa y cumplen filtro)
      const validStudentIds = new Set<string>();

      for (const session of filteredSessions) {
        for (const att of session.attendance) {
          const sid = String(att.studentId);
          const isValid = !!this.studentsMap[sid];

          if (!isValid) continue;

          if (this.selectedStudentId) {
            if (sid === String(this.selectedStudentId)) {
              validStudentIds.add(sid);
            }
          } else {
            validStudentIds.add(sid);
          }
        }
      }

      const data = Array.from(validStudentIds).map(studentId => {
        const row: any = {
          name: this.studentsMap[studentId] ?? studentId
        };

        for (const { key } of dates) {
          const session = filteredSessions.find(s =>
            s.createdAt &&
            new Date(s.createdAt).toISOString().startsWith(key) &&
            s.attendance.some(a => String(a.studentId) === studentId)
          );

          const status = session?.attendance.find(a => String(a.studentId) === studentId)?.status;
          row[key] = status === 'PRESENT' ? '✔️' : status === 'ABSENT' ? '❌' : '';
        }

        return row;
      });

      this.dateColumns = dates;
      this.columns = ['name', ...dates.map(d => d.key)];
      this.dataSource.data = data;
    });
  }


}

