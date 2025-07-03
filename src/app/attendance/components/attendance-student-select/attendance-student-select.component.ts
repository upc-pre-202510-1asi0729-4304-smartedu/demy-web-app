import { Component, EventEmitter, Output, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { AttendanceStudentService, AttendanceStudent } from '../../services/attendance-student.service';

@Component({
  selector: 'app-attendance-student-select',
  standalone: true,
  templateUrl: './attendance-student-select.component.html',
  styleUrls: ['./attendance-student-select.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    TranslatePipe
  ]
})
export class AttendanceStudentSelectComponent {
  students = signal<{ label: string; value: string }[]>([]);
  selectedStudentId: WritableSignal<string> = signal('');

  @Output() studentChanged = new EventEmitter<string>();

  constructor(private attendanceStudentService: AttendanceStudentService) {}

  ngOnInit(): void {
    this.attendanceStudentService.getForAttendance().subscribe({
      next: (res: AttendanceStudent[]) => {
        const mapped = res.map(s => ({
          label: s.name,
          value: s.id
        }));
        this.students.set(mapped);
      },
      error: err => console.error('Error cargando alumnos:', err)
    });
  }

  get selectedId(): string {
    return this.selectedStudentId();
  }

  onSelect(value: string): void {
    this.selectedStudentId.set(value);
    this.studentChanged.emit(value);
  }


  set selectedId(value: string) {
    this.selectedStudentId.set(value);
    this.studentChanged.emit(value);
  }
}
