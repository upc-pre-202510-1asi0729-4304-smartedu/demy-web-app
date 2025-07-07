import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule} from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { WeeklyScheduleService } from '../../services/weekly-schedule.service';
import { ScheduleWeekly } from '../../model/weekly-schedule.entity';
import { Schedule } from '../../model/schedule.entity';
import { TranslatePipe } from '@ngx-translate/core';
import { TeacherRescheduleModalComponent } from '../teacher-reschedule-modal/teacher-reschedule-modal.component';
import { TeacherService } from '../../../iam-user/services/teacher.service';
import { UserAccount } from '../../../iam-user/model/user.entity';

interface DayOfWeek {
  key: string;
  value: string;
}

/**
 * Enhanced component for displaying a teacher's weekly schedule in a grid format.
 * Features interactive schedule blocks and rescheduling capabilities.
 */
@Component({
  selector: 'app-teacher-schedule-search',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatCardModule,
    MatDialogModule,
    MatToolbarModule,
    MatChipsModule,
    FormsModule,
    TranslatePipe
  ],
  templateUrl: './teacher-schedule-search.component.html',
  styleUrls: ['./teacher-schedule-search.component.css']
})
export class TeacherScheduleSearchComponent implements OnInit {
  /** List of all available weekly schedules */
  allSchedules: ScheduleWeekly[] = [];
  /** Teacher's individual schedules */
  teacherSchedules: Schedule[] = [];
  /** State of loading */
  isLoading = false;
  /** Error message */
  errorMessage: string | null = null;
  /** Current teacher being displayed */
  currentTeacher: UserAccount | null = null;

  /** Days of the week configuration */
  daysOfWeek: DayOfWeek[] = [
    { key: 'monday', value: 'Monday' },
    { key: 'tuesday', value: 'Tuesday' },
    { key: 'wednesday', value: 'Wednesday' },
    { key: 'thursday', value: 'Thursday' },
    { key: 'friday', value: 'Friday' },
    { key: 'saturday', value: 'Saturday' },
    { key: 'sunday', value: 'Sunday' }
  ];

  /** Time slots from 7:00 AM to 9:00 PM in 30-minute intervals */
  timeSlots: string[] = [
    '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
    '19:00', '19:30', '20:00', '20:30', '21:00'
  ];

  constructor(
    private weeklyScheduleService: WeeklyScheduleService,
    private teacherService: TeacherService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadTeacherFromLocalStorage();
  }

  private loadTeacherFromLocalStorage(): void {
    const teacherId = localStorage.getItem('teacherId');
    if (!teacherId) {
      this.errorMessage = 'No se encontró el ID del profesor en el almacenamiento local';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    this.teacherService.getTeacherById(teacherId).subscribe({
      next: (teacher) => {
        this.currentTeacher = teacher;
        this.fetchTeacherSchedules();
      },
      error: (error) => {
        console.error('Error loading teacher:', error);
        this.errorMessage = 'Error al cargar la información del profesor';
        this.isLoading = false;
      }
    });
  }

  /**
   * Fetches all teacher schedules from the backend
   */
  private fetchTeacherSchedules(): void {
    if (!this.currentTeacher) {
      this.errorMessage = 'No se encontró información del profesor';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    this.weeklyScheduleService.getAll().subscribe({
      next: (weeklySchedules) => {
        this.allSchedules = weeklySchedules;
        this.extractTeacherSchedules(weeklySchedules);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching teacher schedules:', err);
        this.errorMessage = 'Error al cargar horarios del docente';
        this.isLoading = false;
      }
    });
  }

  /**
   * Extracts individual schedules for the current teacher from weekly schedules
   */
  private extractTeacherSchedules(weeklySchedules: ScheduleWeekly[]): void {
    const allIndividualSchedules: Schedule[] = [];

    weeklySchedules.forEach(weeklySchedule => {
      if (weeklySchedule.weekSchedule && Array.isArray(weeklySchedule.weekSchedule)) {
        weeklySchedule.weekSchedule.forEach(schedule => {
          if (schedule.teacher) {
            allIndividualSchedules.push({
              ...schedule,
              weeklyScheduleId: weeklySchedule.id,
              weeklyScheduleName: weeklySchedule.name
            } as any);
          }
        });
      }
    });

    const teacherId = this.currentTeacher?.id;
    this.teacherSchedules = allIndividualSchedules.filter(schedule => {
      const scheduleTeacherId = schedule.teacher?.id;
      return scheduleTeacherId === teacherId;
    });
  }

  /**
   * Gets the schedule for a specific day and time slot
   */
  getScheduleForSlot(day: string, timeSlot: string): Schedule | null {
    const dayMapping: { [key: string]: string } = {
      'monday': 'Monday',
      'tuesday': 'Tuesday',
      'wednesday': 'Wednesday',
      'thursday': 'Thursday',
      'friday': 'Friday',
      'saturday': 'Saturday',
      'sunday': 'Sunday'
    };

    const mappedDay = dayMapping[day];

    return this.teacherSchedules.find(schedule => {
      const scheduleDayOfWeek = schedule.dayOfWeek;
      const scheduleStartTime = schedule.timeRange?.start;
      const scheduleEndTime = schedule.timeRange?.end;

      // Check if day matches
      if (scheduleDayOfWeek !== mappedDay) {
        return false;
      }

      // Convert times to minutes for comparison
      const [startHour, startMinute] = scheduleStartTime.split(':').map(Number);
      const [endHour, endMinute] = scheduleEndTime.split(':').map(Number);
      const [slotHour, slotMinute] = timeSlot.split(':').map(Number);

      const startTimeInMinutes = startHour * 60 + startMinute;
      const endTimeInMinutes = endHour * 60 + endMinute;
      const slotTimeInMinutes = slotHour * 60 + slotMinute;

      // Check if slot is within class time range
      return slotTimeInMinutes >= startTimeInMinutes && slotTimeInMinutes < endTimeInMinutes;
    }) || null;
  }

  /**
   * Handles cell click events for schedule interaction
   */
  onCellClick(day: string, timeSlot: string): void {
    const schedule = this.getScheduleForSlot(day, timeSlot);
    if (schedule) {
      const dialogRef = this.dialog.open(TeacherRescheduleModalComponent, {
        data: { schedule },
        width: '500px'
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.updateSchedule(result);
        }
      });
    }
  }

  /**
   * Checks if a schedule cell has a class assigned
   */
  hasClass(day: string, timeSlot: string): boolean {
    return this.getScheduleForSlot(day, timeSlot) !== null;
  }

  /**
   * Gets display text for a schedule block
   */
  getScheduleDisplayText(schedule: Schedule): string {
    return `${schedule.course.name} - ${schedule.classroom.code}`;
  }

  /**
   * Gets the time range text for a schedule
   */
  getTimeRangeText(schedule: Schedule): string {
    return `${schedule.timeRange.start} - ${schedule.timeRange.end}`;
  }

  /**
   * Gets the classroom info text
   */
  getClassroomInfo(schedule: Schedule): string {
    return `${schedule.classroom.code} - ${schedule.classroom.campus}`;
  }

  private updateSchedule(updatedSchedule: Schedule): void {
    // Find the weekly schedule that contains this schedule
    const weeklySchedule = this.allSchedules.find(ws =>
      ws.weekSchedule.some(s => s.id === updatedSchedule.id)
    );

    if (weeklySchedule) {
      // Update the schedule in the weekly schedule
      const scheduleIndex = weeklySchedule.weekSchedule.findIndex(s => s.id === updatedSchedule.id);
      if (scheduleIndex !== -1) {
        weeklySchedule.weekSchedule[scheduleIndex] = updatedSchedule;

        // Update the schedule in the backend
        this.weeklyScheduleService.update(weeklySchedule.id, weeklySchedule).subscribe({
          next: () => {
            // Refresh the schedules
            this.fetchTeacherSchedules();
          },
          error: (error) => {
            console.error('Error updating schedule:', error);
            this.errorMessage = 'Error al actualizar el horario';
          }
        });
      }
    }
  }
}
