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
//import { TeachersService } from '../../services/teacher.service';

/**
 * Component for displaying a modal to add, edit, or delete a weekly schedule.
 * Provides a form interface for adding or modifying weekly schedules,
 * as well as a confirmation dialog for deletion.
 */
@Component({
  selector: 'app-weekly-schedule-modal',
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
    MatIconButton
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

  // availableTeachers: Teachers[] = []; // Uncomment when the Teacher entity is available

  /** Available day options for the schedule */
  dayOptions: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  /** Schedules already added to the weekly schedule */
  currentSchedule: Schedule = new Schedule({});

  /**
   * Initializes the component based on the dialog data
   * @param dialogRef - Reference to the dialog used to close the dialog when done
   * @param data - The data passed to the dialog, containing mode and weekly schedule information
   * @param classroomService - Service used to load available classrooms
   * @param courseService - Service used to load available courses
   */
  constructor(
    public dialogRef: MatDialogRef<WeeklyScheduleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    // private teacherService: TeacherService, // Uncomment when the Teacher entity is available
    private classroomService: ClassroomService,
    private courseService: CourseService
  ) {
    this.mode = data.mode;
    this.weeklySchedule = data.weeklySchedule || new ScheduleWeekly({});

    // Set the dialog title based on the mode
    if (this.mode === 'add') {
      this.dialogTitle = 'Add New Weekly Schedule';
    } else if (this.mode === 'edit') {
      this.dialogTitle = 'Edit Weekly Schedule';
    } else if (this.mode === 'delete') {
      this.dialogTitle = 'Confirm Deletion';
    }

    // Load available courses and classrooms
    this.loadAvailableCourses();
    this.loadAvailableClassrooms();
    // this.loadAvailableTeachers(); // Uncomment when the Teacher entity is available
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
   * Handles the cancellation of the dialog and closes it
   */
  onCancel(): void {
    this.dialogRef.close(null);
  }

  /**
   * Handles the form submission for creating or updating the weekly schedule
   * Closes the dialog and passes the updated weekly schedule
   */
  onSubmit(): void {
    this.dialogRef.close(this.weeklySchedule);
  }

  /**
   * Confirms the deletion of the weekly schedule and closes the dialog with a true value
   */
  onConfirmDelete(): void {
    this.dialogRef.close(true);
  }

  /**
   * Adds a schedule to the weekly schedule
   * Validates that the schedule has necessary fields before adding it to the weekly schedule
   */
  addSchedule(): void {
    if (
      this.currentSchedule.dayOfWeek &&
      this.currentSchedule.timeRange.start &&
      this.currentSchedule.timeRange.end &&
      this.currentSchedule.course.id &&
      // this.currentSchedule.teacher.id &&    // Uncomment when the Teacher entity is available
      this.currentSchedule.classroom.id
    ) {
      // Find the full Course and Classroom objects based on IDs
      const course = this.availableCourses.find(c => c.id === this.currentSchedule.course.id);
      const classroom = this.availableClassrooms.find(c => c.id === this.currentSchedule.classroom.id);
      // const teacher = this.availableTeachers.find(t => t.id === this.currentSchedule.teacher.id);   // Uncomment when the Teacher entity is available

      // Ensure course and classroom exist before proceeding
      if (course && classroom) {
        // Create a new Schedule object with full references
        const scheduleToAdd = new Schedule({
          id: Date.now(), // Temporary ID
          dayOfWeek: this.currentSchedule.dayOfWeek,
          timeRange: { ...this.currentSchedule.timeRange },
          course: course,
          classroom: classroom
          // teacher: teacher
        });

        // Add the schedule to the weekly schedule
        this.weeklySchedule.weekSchedule.push(scheduleToAdd);

        // Reset current schedule
        this.currentSchedule = new Schedule({});
      }
    }
  }

  /**
   * Removes a schedule from the weekly schedule by index
   * @param index - The index of the schedule to remove
   */
  removeSchedule(index: number): void {
    this.weeklySchedule.weekSchedule.splice(index, 1);
  }
}
