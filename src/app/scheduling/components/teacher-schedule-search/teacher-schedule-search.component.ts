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
import { Schedule } from '../../model/schedule.entity';
import { TranslatePipe } from '@ngx-translate/core';
import { TeacherRescheduleModalComponent } from '../teacher-reschedule-modal/teacher-reschedule-modal.component';
import { TeacherService } from '../../../iam-user/services/teacher.service';
import { UserAccount } from '../../../iam-user/model/user.entity';
import { CourseService } from '../../services/course.service';
import { ClassroomService } from '../../services/classroom.service';

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
    { key: 'monday', value: 'schedule.days.monday' },
    { key: 'tuesday', value: 'schedule.days.tuesday' },
    { key: 'wednesday', value: 'schedule.days.wednesday' },
    { key: 'thursday', value: 'schedule.days.thursday' },
    { key: 'friday', value: 'schedule.days.friday' },
    { key: 'saturday', value: 'schedule.days.saturday' },
    { key: 'sunday', value: 'schedule.days.sunday' }
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
    private courseService: CourseService,
    private classroomService: ClassroomService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadTeacherFromLocalStorage();
  }

  private loadTeacherFromLocalStorage(): void {
    const teacherId = Number(localStorage.getItem('teacherId'));
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
   * Fetches teacher schedules from the backend using the specific teacher endpoint
   */
  private fetchTeacherSchedules(): void {
    if (!this.currentTeacher) {
      this.errorMessage = 'No se encontró información del profesor';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    this.weeklyScheduleService.getSchedulesByTeacherId(this.currentTeacher.id).subscribe({
      next: (schedulesData) => {
        // Convert backend data to Schedule instances
        this.teacherSchedules = schedulesData.map(scheduleData => new Schedule(scheduleData));

        // Load course and classroom details for each schedule
        this.loadScheduleDetails();
      },
      error: (err) => {
        console.error('Error fetching teacher schedules:', err);
        this.errorMessage = 'Error al cargar horarios del docente';
        this.isLoading = false;
      }
    });
  }



  /**
   * Gets the schedule for a specific day and time slot
   */
  getScheduleForSlot(day: string, timeSlot: string): Schedule | null {
    const dayMapping: { [key: string]: string } = {
      'monday': 'MONDAY',
      'tuesday': 'TUESDAY',
      'wednesday': 'WEDNESDAY',
      'thursday': 'THURSDAY',
      'friday': 'FRIDAY',
      'saturday': 'SATURDAY',
      'sunday': 'SUNDAY'
    };

    const mappedDay = dayMapping[day];

    return this.teacherSchedules.find(schedule => {
      const scheduleDayOfWeek = schedule.dayOfWeek;
      const scheduleStartTime = schedule.timeRange.start;
      const scheduleEndTime = schedule.timeRange.end;

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
          this.updateSchedule();
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
   * Loads course and classroom details for each schedule
   */
  private loadScheduleDetails(): void {
    let completedRequests = 0;
    const totalRequests = this.teacherSchedules.length * 2; // course + classroom for each schedule

    if (totalRequests === 0) {
      this.isLoading = false;
      return;
    }

    this.teacherSchedules.forEach(schedule => {
      // Load course details
      if (schedule.course?.id) {
        this.courseService.getById(schedule.course.id).subscribe({
          next: (course) => {
            schedule.course = course;
            completedRequests++;
            if (completedRequests === totalRequests) {
              this.isLoading = false;
            }
          },
          error: () => {
            completedRequests++;
            if (completedRequests === totalRequests) {
              this.isLoading = false;
            }
          }
        });
      } else {
        completedRequests++;
      }

      // Load classroom details
      if (schedule.classroom?.id) {
        this.classroomService.getById(schedule.classroom.id).subscribe({
          next: (classroom) => {
            schedule.classroom = classroom;
            completedRequests++;
            if (completedRequests === totalRequests) {
              this.isLoading = false;
            }
          },
          error: () => {
            completedRequests++;
            if (completedRequests === totalRequests) {
              this.isLoading = false;
            }
          }
        });
      } else {
        completedRequests++;
      }
    });
  }

  private updateSchedule(): void {
    this.fetchTeacherSchedules();
  }
}
