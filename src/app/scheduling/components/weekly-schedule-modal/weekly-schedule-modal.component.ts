import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { ScheduleWeekly } from '../../model/weekly-schedule.entity';
import { Course } from '../../model/course.entity';
import { Classroom } from '../../model/classroom.entity';
import { Schedule } from '../../model/schedule.entity';
import {UserAccount} from '../../../iam-user/model/user.entity';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatError } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CourseService } from '../../services/course.service';
import { MatIconModule } from '@angular/material/icon';
import { ClassroomService } from '../../services/classroom.service';
import { TeacherService } from '../../../iam-user/services/teacher.service';
import {TranslatePipe} from '@ngx-translate/core';
import {WeeklyScheduleService} from '../../services/weekly-schedule.service';

/**
 * Component for displaying a modal to add, edit, or delete a weekly schedule.
 * Provides a form interface for adding or modifying weekly schedules,
 * as well as a confirmation dialog for deletion.
 */
@Component({
  selector: 'app-weekly-schedule-modal',
  standalone: true,
  imports: [
    MatFormField,
    FormsModule,
    MatInput,
    MatButton,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatLabel,
    MatError,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatIconButton,
    TranslatePipe
  ],
  templateUrl: './weekly-schedule-modal.component.html',
  styleUrls: ['./weekly-schedule-modal.component.css']
})
export class WeeklyScheduleModalComponent {

  /** Title of the dialog based on the mode (add/edit/delete) */
  dialogTitle?: string;

  /** The weekly schedule object being added or edited */
  weeklySchedule: ScheduleWeekly;

  /** The mode of the dialog - 'add', 'edit', or 'delete' */
  mode: 'add' | 'edit' | 'delete';

  /** Data for select options for courses */
  availableCourses: Course[] = [];

  /** Data for select options for classrooms */
  availableClassrooms: Classroom[] = [];

  availableTeachers: UserAccount[] = []; // Uncomment when the Teacher entity is available

  /** Available day options for the schedule */
  dayOptions: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  /** Schedules already added to the weekly schedule */
  currentSchedule: Schedule = new Schedule({});

  /** Time slots (from 7:00 AM to 9:00 PM in 30-minute intervals) */
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

  /**
   * Initializes the component based on the dialog data
   * @param dialogRef - Reference to the dialog used to close the dialog when done
   * @param data - The data passed to the dialog, containing mode and weekly schedule information
   * @param weeklyScheduleService
   * @param teacherService - Service used to load available teachers
   * @param classroomService - Service used to load available classrooms
   * @param courseService - Service used to load available courses
   */
  constructor(
    public dialogRef: MatDialogRef<WeeklyScheduleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private weeklyScheduleService: WeeklyScheduleService,
    private teacherService: TeacherService,
    private classroomService: ClassroomService,
    private courseService: CourseService
  ) {
    this.mode = data.mode;
    this.weeklySchedule = data.weeklySchedule || new ScheduleWeekly({});

    // Ensure weekSchedule is always initialized as an array
    if (!this.weeklySchedule.weekSchedule) {
      this.weeklySchedule.weekSchedule = [];
    }

    // Ensure currentSchedule is properly initialized
    this.currentSchedule = new Schedule({});

    // Set the dialog title based on the mode
    if (this.mode === 'add') {
      this.dialogTitle = 'Add New Weekly Schedule';
    } else if (this.mode === 'edit') {
      this.dialogTitle = 'Edit Weekly Schedule';
      // Load the complete weekly schedule with schedules if we have an ID
      if (this.weeklySchedule.id) {
        this.loadWeeklyScheduleWithSchedules();
      }
    } else if (this.mode === 'delete') {
      this.dialogTitle = 'Confirm Deletion';
    }

    // Load available courses and classrooms
    this.loadAvailableCourses();
    this.loadAvailableClassrooms();
    this.loadAvailableTeachers(); // Uncomment when the Teacher entity is available
  }

  /**
   * Loads the available courses from the CourseService
   */
  loadAvailableCourses() {
    this.courseService.getAll().subscribe(courses => {
      this.availableCourses = courses;
    });
  }

  /**
   * Loads the available classrooms from the ClassroomService
   */
  loadAvailableClassrooms() {
    this.classroomService.getAll().subscribe(classrooms => {
      this.availableClassrooms = classrooms;
    });
  }

  /**
   * Loads the available teachers from the TeachersService
   */
  loadAvailableTeachers() {
    this.teacherService.getTeachers().subscribe(teachers => {
      this.availableTeachers = teachers;
    });
  }

  /**
   * Loads the complete weekly schedule with all its schedules from the backend
   */
  loadWeeklyScheduleWithSchedules() {
    if (this.weeklySchedule.id) {
      console.log('Loading weekly schedule with ID:', this.weeklySchedule.id);
      this.weeklyScheduleService.getById(this.weeklySchedule.id).subscribe({
        next: (completeWeeklySchedule) => {
          console.log('Received complete weekly schedule:', completeWeeklySchedule);
          this.weeklySchedule = completeWeeklySchedule;

          // Map backend structure to frontend structure
          if ((this.weeklySchedule as any).schedules && !this.weeklySchedule.weekSchedule) {
            this.weeklySchedule.weekSchedule = (this.weeklySchedule as any).schedules;
          }

          // Ensure weekSchedule is always initialized as an array
          if (!this.weeklySchedule.weekSchedule) {
            this.weeklySchedule.weekSchedule = [];
          }

          console.log('Final weekly schedule after mapping:', this.weeklySchedule);
          console.log('Schedules array:', this.getSchedulesArray());

          // Load complete data for schedules (course, classroom, teacher details)
          this.loadCompleteScheduleData();
        },
        error: (error) => {
          console.error('Error loading weekly schedule:', error);
        }
      });
    }
  }

  /**
   * Gets the schedules array safely, handling both property names
   */
  private getSchedulesArray(): any[] {
    return this.weeklySchedule.weekSchedule || (this.weeklySchedule as any).schedules || [];
  }

  /**
   * Gets the schedules array for template use
   */
  get schedules(): any[] {
    return this.getSchedulesArray();
  }

  /**
   * Checks if there are any schedules to display
   */
  get hasSchedules(): boolean {
    const schedules = this.getSchedulesArray();
    return schedules && schedules.length > 0;
  }

  /**
   * Loads complete data for schedules (course, classroom, teacher details)
   */
  private loadCompleteScheduleData() {
    const schedules = this.getSchedulesArray();

    schedules.forEach((schedule: any) => {
      // Load course details if we only have courseId
      if (schedule.courseId && (!schedule.course || !schedule.course.name)) {
        this.courseService.getById(schedule.courseId).subscribe(course => {
          schedule.course = course;
          // Trigger change detection
          this.weeklySchedule = { ...this.weeklySchedule };
        });
      }

      // Load classroom details if we only have classroomId
      if (schedule.classroomId && (!schedule.classroom || !schedule.classroom.code)) {
        this.classroomService.getById(schedule.classroomId).subscribe(classroom => {
          schedule.classroom = classroom;
          // Trigger change detection
          this.weeklySchedule = { ...this.weeklySchedule };
        });
      }

      // Load teacher details if we only have teacherId
      if (schedule.teacherId && (!schedule.teacher || !schedule.teacher.fullName)) {
        this.teacherService.getTeacherById(schedule.teacherId.toString()).subscribe(teacher => {
          schedule.teacher = teacher;
          // Trigger change detection
          this.weeklySchedule = { ...this.weeklySchedule };
        });
      }
    });
  }

  /**
   * Handles the cancellation of the dialog and closes it
   */
  onCancel(): void {
    this.dialogRef.close(null);
  }

  /**
   * Handles the form submission for creating or updating the weekly schedule
   */
  onSubmit(): void {
    if (this.mode === 'add') {
      // Primero crear el weekly schedule
      this.createWeeklySchedule();
    } else if (this.mode === 'edit') {
      // Actualizar el weekly schedule existente
      this.updateWeeklySchedule();
    }
  }
  onConfirmDelete(): void {
    this.dialogRef.close(true);
  }

  /**
   * Creates a new weekly schedule
   */
  private createWeeklySchedule(): void {
    this.dialogRef.close({
      name: this.weeklySchedule.name
    });
  }

  /**
   * Updates an existing weekly schedule
   */
  private updateWeeklySchedule(): void {
    const updateData = { name: this.weeklySchedule.name };
    this.weeklyScheduleService.updateName(this.weeklySchedule.id, updateData).subscribe({
      next: (updatedWeeklySchedule) => {
        this.dialogRef.close(updatedWeeklySchedule);
      },
      error: (error) => {
        alert('Error al actualizar el horario semanal. Intenta de nuevo.');
        console.error('Error updating weekly schedule:', error);
      }
    });
  }

  /**
   * Add a new schedule to the weekly schedule
   */
  addSchedule(): void {
    if (!this.isValidSchedule()) {
      console.warn('Invalid schedule data');
      return;
    }

    // Si estamos en modo 'add' y no tenemos ID, primero crear el weekly schedule
    if (this.mode === 'add' && !this.weeklySchedule.id) {
      this.createWeeklyScheduleAndAddSchedule();
      return;
    }

    // Si ya tenemos un weekly schedule, agregar el schedule directamente
    this.addScheduleToExistingWeeklySchedule();
  }

  /**
   * Creates weekly schedule first, then adds the schedule
   */
  private createWeeklyScheduleAndAddSchedule(): void {
    const weeklyScheduleData = new ScheduleWeekly({
      name: this.weeklySchedule.name
    });

    this.weeklyScheduleService.create(weeklyScheduleData).subscribe({
      next: (createdWeeklySchedule) => {
        this.weeklySchedule = createdWeeklySchedule;
        this.addScheduleToExistingWeeklySchedule();
      },
      error: (error) => {
        console.error('Error creating weekly schedule:', error);
      }
    });
  }

  /**
   * Adds schedule to existing weekly schedule
   */
  private addScheduleToExistingWeeklySchedule(): void {
    const selectedTeacher = this.availableTeachers.find(t => t.id === this.currentSchedule.teacher.id);
    const selectedCourse = this.availableCourses.find(c => c.id === this.currentSchedule.course.id);
    const selectedClassroom = this.availableClassrooms.find(c => c.id === this.currentSchedule.classroom.id);

    if (selectedTeacher && selectedCourse && selectedClassroom) {
      const firstName = selectedTeacher.fullName.split(' ')[0] || '';
      const lastName = selectedTeacher.fullName.split(' ').slice(1).join(' ') || '';

      const scheduleData = {
        startTime: this.currentSchedule.timeRange.start,
        endTime: this.currentSchedule.timeRange.end,
        dayOfWeek: this.currentSchedule.dayOfWeek,
        courseId: selectedCourse.id,
        classroomId: selectedClassroom.id,
        teacherFirstName: firstName,
        teacherLastName: lastName
      };

      this.weeklyScheduleService.addScheduleToWeeklySchedule(this.weeklySchedule.id, scheduleData).subscribe({
        next: (response) => {
          console.log('Schedule added successfully:', response);
          // Add the schedule locally for immediate feedback
          const newSchedule = {
            id: response.id || Date.now(),
            dayOfWeek: this.currentSchedule.dayOfWeek,
            timeRange: {
              start: this.currentSchedule.timeRange.start,
              end: this.currentSchedule.timeRange.end
            },
            course: selectedCourse,
            classroom: selectedClassroom,
            teacher: selectedTeacher
          };
          // weekSchedule
          if (!this.weeklySchedule.weekSchedule) {
            this.weeklySchedule.weekSchedule = [];
          }
          this.weeklySchedule.weekSchedule = [...this.weeklySchedule.weekSchedule, newSchedule];
          // schedules (backend)
          if ((this.weeklySchedule as any).schedules) {
            (this.weeklySchedule as any).schedules = [...((this.weeklySchedule as any).schedules), newSchedule];
          }
          // Refresh the complete weekly schedule to get updated data from backend
          this.loadWeeklyScheduleWithSchedules();
          // Limpiar el formulario de schedule actual
          this.currentSchedule = new Schedule({});
        },
        error: (error) => {
          console.error('Error adding schedule:', error);
        }
      });
    }
  }

  /**
   * Removes a schedule from the weekly schedule by index
   * @param index - The index of the schedule to remove
   */
  removeSchedule(index: number): void {
    const schedules = this.getSchedulesArray();
    const schedule = schedules[index];

    if (schedule && schedule.id) {
      this.weeklyScheduleService.removeScheduleFromWeeklySchedule(this.weeklySchedule.id, schedule.id).subscribe({
        next: (response) => {
          console.log('Schedule removed successfully:', response);
          this.loadWeeklyScheduleWithSchedules();
        },
        error: (error) => {
          console.error('Error removing schedule:', error);
        }
      });
    } else {
      // Si no tiene ID, solo remover del array local
      if (this.weeklySchedule.weekSchedule) {
        this.weeklySchedule.weekSchedule = this.weeklySchedule.weekSchedule.filter((_, i) => i !== index);
      } else if ((this.weeklySchedule as any).schedules) {
        (this.weeklySchedule as any).schedules = ((this.weeklySchedule as any).schedules).filter((_: any, i: number) => i !== index);
      }
    }
  }

  /**
   * Validates if the current schedule has all required fields
   */
  private isValidSchedule(): boolean {
    return !!(
      this.currentSchedule.dayOfWeek &&
      this.currentSchedule.timeRange.start &&
      this.currentSchedule.timeRange.end &&
      this.currentSchedule.course.id &&
      this.currentSchedule.teacher.id &&
      this.currentSchedule.classroom.id &&
      this.weeklySchedule.name
    );
  }
}
