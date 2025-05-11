import {Component, Input } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {Student} from '../../../enrollments/model/student.entity';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-student-status',
  imports: [
    MatTableModule,
    TranslatePipe
  ],
  templateUrl: './student-status.component.html',
  styleUrl: './student-status.component.css'
})
export class StudentStatusComponent {
  @Input() students: Student[] = [];

  displayedColumns = ['id', 'firstName', 'lastName', 'dni', 'sex'];
}
