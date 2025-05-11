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
import {MatButton, MatIconButton} from '@angular/material/button';
import { MatError } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CourseService } from '../../services/course.service';
import { MatIconModule } from '@angular/material/icon';
import {ClassroomService} from '../../services/classroom.service';
//import { TeachersService } from '../../services/teacher.service';


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
  styleUrl: './weekly-schedule-modal.component.css'
})
export class WeeklyScheduleModalComponent  {

  dialogTitle?: string;
  weeklySchedule: ScheduleWeekly;
  mode: 'add' | 'edit' | 'delete';


  // Data for select options
  availableCourses: Course[] = [];
  availableClassrooms: Classroom[] = [];
  //availableTeachers: Teachers[]= []; //AGREGAR CUANDO SE AGREGUE EL ENTITY


  dayOptions: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


  // Schedules ya agregados
  currentSchedule: Schedule = new Schedule({});

  constructor(
    public dialogRef: MatDialogRef<WeeklyScheduleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    //private teacherService: TeacherService, //AGREGAR CUANDO SE AGREGUE EL ENTITY
    private classroomService: ClassroomService,
    private courseService: CourseService
  ) {
    this.mode = data.mode;
    this.weeklySchedule = data.weeklySchedule || new ScheduleWeekly({});

    if (this.mode === 'add') {
      this.dialogTitle = 'Add New Weekly Schedule';
    } else if (this.mode === 'edit') {
      this.dialogTitle = 'Edit Weekly Schedule';
    } else if (this.mode === 'delete') {
      this.dialogTitle = 'Confirm Deletion';
    }

    // Load available courses, classrooms and teachers
    this.loadAvailableCourses();
    this.loadAvailableClassrooms();
    //this.loadAvailableTeachers(); //AGREGAR CUANDO SE AGREGUE EL ENTITY
  }

  loadAvailableCourses() {
    this.courseService.getAll().subscribe(courses => {
      this.availableCourses = courses;
    });
  }

  //AGREGAR CUANDO SE AGREGUE EL ENTITY
  /*
  loadAvailableTeachers() {
    this.teacherService.getAll().subscribe(teachers => {
      this.availableTeachers = teachers;
    });
  }
  */


  loadAvailableClassrooms() {
    this.classroomService.getAll().subscribe(classrooms => {
       this.availableClassrooms = classrooms;
     });
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onSubmit(): void {
    this.dialogRef.close(this.weeklySchedule);
  }

  onConfirmDelete(): void {
    this.dialogRef.close(true);
  }

  addSchedule(): void {
    if (this.currentSchedule.dayOfWeek &&
      this.currentSchedule.timeRange.start &&
      this.currentSchedule.timeRange.end &&
      this.currentSchedule.course.id &&
      //this.currentSchedule.teacher.id &&    //AGREGAR CUANDO SE AGREGUE EL ENTITY
      this.currentSchedule.classroom.id) {

      // Find the full Course, Classroom and Teacher objects
      const course = this.availableCourses.find(c => c.id === this.currentSchedule.course.id);
      const classroom = this.availableClassrooms.find(c => c.id === this.currentSchedule.classroom.id);
      //const teacher = this.availableTeachers.find(t => t.id === this.currentSchedule.teacher.id);   //AGREGAR CUANDO SE AGREGUE EL ENTITY


      // course && classroom && teacher
      if (course && classroom ) {
        // Create a new Schedule object with full references
        const scheduleToAdd = new Schedule({
          id: Date.now(), // Temporary ID
          dayOfWeek: this.currentSchedule.dayOfWeek,
          timeRange: { ...this.currentSchedule.timeRange },
          course: course,
          classroom: classroom
          //teacher: teacher
        });

        // Add to weekly schedule
        this.weeklySchedule.weekSchedule.push(scheduleToAdd);

        // Reset current schedule
        this.currentSchedule = new Schedule({});
      }
    }
  }

  removeSchedule(index: number): void {
    this.weeklySchedule.weekSchedule.splice(index, 1);
  }
}

