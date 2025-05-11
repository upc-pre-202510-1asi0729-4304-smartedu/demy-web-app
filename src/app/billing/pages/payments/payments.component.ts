import { Component, signal } from '@angular/core';
import {StudentSearchComponent} from '../../components/student-search/student-search.component';
import {StudentStatusComponent} from '../../components/student-status/student-status.component';
import { StudentService } from '../../../enrollments/services/student.service';
import { Student } from '../../../enrollments/model/student.entity';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-payments',
  imports: [
    StudentSearchComponent,
    StudentStatusComponent,
    TranslatePipe
  ],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent {
  studentResult = signal<Student[]>([]);

  constructor(private studentService: StudentService) {}

  onSearch(dni: string) {
    this.studentService.getByDni(dni).subscribe({
      next: students => this.studentResult.set(students),
      error: err => console.error('Error fetching student by DNI', err)
    });
  }
}
