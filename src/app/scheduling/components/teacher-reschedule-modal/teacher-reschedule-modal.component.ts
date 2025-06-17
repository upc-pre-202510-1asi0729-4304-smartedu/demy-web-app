import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { Schedule } from '../../model/schedule.entity';
import { Classroom } from '../../model/classroom.entity';
import { ClassroomService } from '../../services/classroom.service';

@Component({
  selector: 'app-teacher-reschedule-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    TranslatePipe
  ],
  templateUrl: './teacher-reschedule-modal.component.html',
  styleUrls: ['./teacher-reschedule-modal.component.css']
})
export class TeacherRescheduleModalComponent implements OnInit {
  rescheduleForm: FormGroup;
  availableClassrooms: Classroom[] = [];
  loadingData = false;
  error: string | null = null;

  dayOptions = [
    { label: 'Lunes', value: 'Monday' },
    { label: 'Martes', value: 'Tuesday' },
    { label: 'Miércoles', value: 'Wednesday' },
    { label: 'Jueves', value: 'Thursday' },
    { label: 'Viernes', value: 'Friday' },
    { label: 'Sábado', value: 'Saturday' },
    { label: 'Domingo', value: 'Sunday' }
  ];

  timeSlots: string[] = [
    '07:00', '07:30',
    '08:00', '08:30',
    '09:00', '09:30',
    '10:00', '10:30',
    '11:00', '11:30',
    '12:00', '12:30',
    '13:00', '13:30',
    '14:00', '14:30',
    '15:00', '15:30',
    '16:00', '16:30',
    '17:00', '17:30',
    '18:00', '18:30',
    '19:00', '19:30',
    '20:00', '20:30',
    '21:00'
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TeacherRescheduleModalComponent>,
    private classroomService: ClassroomService,
    @Inject(MAT_DIALOG_DATA) public data: { schedule: Schedule }
  ) {
    this.rescheduleForm = this.fb.group({
      dayOfWeek: [data.schedule.dayOfWeek, Validators.required],
      startTime: [data.schedule.timeRange.start, Validators.required],
      endTime: [data.schedule.timeRange.end, Validators.required],
      classroomId: [data.schedule.classroom.id, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadClassrooms();
  }

  private loadClassrooms(): void {
    this.loadingData = true;
    this.error = null;

    this.classroomService.getAll().subscribe({
      next: (response: any) => {
        this.availableClassrooms = Array.isArray(response) ? response : response.data;
      },
      error: (error: Error) => {
        console.error('Error loading classrooms:', error);
        this.error = 'Error al cargar las aulas disponibles';
      },
      complete: () => {
        this.loadingData = false;
      }
    });
  }

  validateTimeRange(start: string, end: string): boolean {
    const [startHour, startMinute] = start.split(':').map(Number);
    const [endHour, endMinute] = end.split(':').map(Number);

    const startTimeInMinutes = startHour * 60 + startMinute;
    const endTimeInMinutes = endHour * 60 + endMinute;

    // Verificar que la hora de inicio sea después de las 7:00 AM
    if (startTimeInMinutes < 7 * 60) {
      return false;
    }

    // Verificar que la hora de fin sea antes de las 9:00 PM
    if (endTimeInMinutes > 21 * 60) {
      return false;
    }

    // Verificar que la duración sea de al menos 30 minutos
    return endTimeInMinutes - startTimeInMinutes >= 30;
  }

  onSubmit(): void {
    if (this.rescheduleForm.valid) {
      const formValue = this.rescheduleForm.value;

      if (!this.validateTimeRange(formValue.startTime, formValue.endTime)) {
        this.error = 'El horario debe estar entre las 7:00 AM y las 9:00 PM, con una duración mínima de 30 minutos';
        return;
      }

      const selectedClassroom = this.availableClassrooms.find(c => c.id === formValue.classroomId);

      if (selectedClassroom) {
        const updatedSchedule: Schedule = {
          ...this.data.schedule,
          dayOfWeek: formValue.dayOfWeek,
          timeRange: {
            start: formValue.startTime,
            end: formValue.endTime
          },
          classroom: selectedClassroom
        };

        this.dialogRef.close(updatedSchedule);
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  get isFormValid(): boolean {
    return this.rescheduleForm.valid;
  }
}
