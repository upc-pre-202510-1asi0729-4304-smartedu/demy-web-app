import {Component, OnInit, signal} from '@angular/core';
import { SearchEnrollmentByDniComponent } from '../../components/enrollment-search-by-dni/search-enrollment-by-dni.component';
import { EnrollmentsTableComponent } from '../../components/enrollments-table/enrollments-table.component';
import { EnrollmentService } from '../../services/enrollment.service';
import { StudentService } from '../../services/student.service';
import { TranslatePipe } from '@ngx-translate/core';
import { Enrollment } from '../../model/enrollment.entity';
import { Student } from '../../model/student.entity';
import {AcademicPeriod} from '../../model/academic-period.entity';
import {AcademicPeriodService} from '../../services/academic-period.service';

@Component({
  selector: 'app-enrollments-search',
  imports: [
    SearchEnrollmentByDniComponent,
    EnrollmentsTableComponent,
    TranslatePipe
  ],
  templateUrl: './enrollments-search.component.html',
  styleUrl: './enrollments-search.component.css'
})
export class EnrollmentsSearchComponent implements OnInit {

  enrollments = signal<Enrollment[]>([]);
  students = signal<Student[]>([]);
  periods     = signal<AcademicPeriod[]>([]);

  constructor(
    private enrollmentService: EnrollmentService,
    private studentService: StudentService,
    private periodService: AcademicPeriodService) {}

  ngOnInit() {
    // cargamos todos los periodos sólo una vez
    this.periodService.getAll().subscribe(ps => this.periods.set(ps));
  }

  /**
   * Handles DNI search. Looks up the student, then fetches their enrollments.
   * @param dni - The student's DNI to search.
   */
  onSearch(dni: string) {
    this.studentService.getByDni(dni).subscribe({
      next: student => {
        // ponemos el único student en un array para tu tabla
        this.students.set([student]);
        // cargamos sus enrollments
        this.enrollmentService.getByStudentId(student.id).subscribe({
          next: enrollments => this.enrollments.set(enrollments),
          error: err => console.error('Error fetching enrollments', err)
        });
      },
      error: err => {
        console.error('No encontrado o error al buscar student by DNI', err);
        // vaciamos la tabla
        this.students.set([]);
        this.enrollments.set([]);
      }
    });
  }


  /**
   * Handles a request to change enrollment status, e.g., activate enrollment.
   */
  onRequestedEnrollmentStatus(enrollment: Enrollment) {
    console.log('Enrollment status requested for', enrollment);
    // Podrías abrir un modal o llamar a un service para actualizar el estado
  }
}

