import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {Enrollment} from '../../model/enrollment.entity';
import {Student} from '../../model/student.entity';
import {AcademicPeriod} from '../../model/academic-period.entity';

@Component({
  selector: 'app-enrollments-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    TranslatePipe,
  ],
  templateUrl: './enrollments-table.component.html',
  styleUrl: './enrollments-table.component.css'
})
export class EnrollmentsTableComponent implements OnChanges {
  @Input() enrollmentsData!: Enrollment[];
  @Input() studentsData !: Student[];
  @Input() periodsData !: AcademicPeriod[];
  @Output() requestedEnrollmentStatus = new EventEmitter<Enrollment>();
  // displayedColumns = ['studentDni', 'studentName', 'academicPeriod', 'status', 'action'];
  displayedColumns = ['studentDni', 'studentName', 'academicPeriod', 'status'];
  studentMap = new Map<number, Student>();
  periodMap  = new Map<number, AcademicPeriod>();
  ngOnChanges() {
    if (this.enrollmentsData) {
      this.enrollmentsData = [...this.enrollmentsData];
    } else {
      this.enrollmentsData = [];
    }
    this.buildStudentMap();
    this.buildPeriodMap();
  }

  private buildStudentMap() {
    if (this.studentsData) {
      this.studentMap.clear();
      this.studentsData.forEach(s => this.studentMap.set(s.id, s));
    }
  }
  private buildPeriodMap() {
    this.periodMap.clear();
    this.periodsData.forEach(p => this.periodMap.set(p.id, p));
  }
}
export interface EnrollmentWithStudent {
  enrollments: Enrollment[];
  student: Student;
}

