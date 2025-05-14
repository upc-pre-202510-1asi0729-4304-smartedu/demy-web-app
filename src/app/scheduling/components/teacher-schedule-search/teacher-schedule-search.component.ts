import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { WeeklyScheduleService } from '../../services/weekly-schedule.service';
import { ScheduleWeekly } from '../../model/weekly-schedule.entity';
import { Schedule } from '../../model/schedule.entity';
import { TranslatePipe } from '@ngx-translate/core';
import {UserAccount} from '../../../iam-user/model/user.entity';

/**
 * Component for displaying a teacher's weekly schedule.
 * Displays the weekly schedule for the logged-in teacher.
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
    ReactiveFormsModule,
    TranslatePipe
  ],
  templateUrl: './teacher-schedule-search.component.html',
  styleUrls: ['./teacher-schedule-search.component.css']
})
export class TeacherScheduleSearchComponent implements OnInit {
  /** List of all available weekly schedules */
  allSchedules: ScheduleWeekly[] = [];
  /** Teacher's weekly schedules - containing only schedules where the teacher is assigned */
  teacherSchedules: Schedule[] = [];
  /** State of loading */
  isLoading = false;
  /** Error message */
  errorMessage: string | null = null;
  /** Teacher information from localStorage */
  currentTeacher: UserAccount | null = null;
  /** Days of the week for table headers */
  weekDays = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
  ];

  /**
   * Initializes the component
   * @param weeklyScheduleService - Service used to fetch weekly schedules from the backend
   */
  constructor(
    private weeklyScheduleService: WeeklyScheduleService,
  ) {}

  /**
   * On component initialization:
   * 1. Get teacher data from localStorage
   * 2. Load weekly schedules
   */
  ngOnInit(): void {
    this.loadTeacherInfo();
    this.loadWeeklySchedules();
  }

  /**
   * Loads the teacher information from localStorage
   */
  loadTeacherInfo(): void {
    const teacherData = localStorage.getItem('currentTeacher');
    if (teacherData) {
      try {
        this.currentTeacher = JSON.parse(teacherData);
      } catch (error) {
        console.error('Error parsing teacher data from localStorage:', error);
        this.errorMessage = 'Error al cargar información del profesor.';
      }
    } else {
      this.errorMessage = 'No se encontró información del profesor. Por favor inicie sesión.';
    }
  }


  /**
   * Loads all available weekly schedules and filters for the current teacher
   */
  loadWeeklySchedules(): void {
    if (!this.currentTeacher || !this.currentTeacher.id) {
      this.errorMessage = 'No se encontró ID del profesor. Por favor inicie sesión nuevamente.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    this.weeklyScheduleService.getAll().subscribe({
      next: (schedules) => {
        this.allSchedules = schedules;
        this.filterTeacherSchedules();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching weekly schedules:', error);
        this.errorMessage = 'Ocurrió un error al cargar los horarios. Por favor, intente nuevamente.';
        this.isLoading = false;
      }
    });
  }

  /**
   * Filters all schedules to include only those assigned to the current teacher
   */
  filterTeacherSchedules(): void {
    if (!this.currentTeacher || !this.currentTeacher.id) return;

    this.teacherSchedules = [];

    // Flatten all weekly schedules and filter by current teacher ID
    this.allSchedules.forEach(weeklySchedule => {
      const teacherSchedulesInWeek = weeklySchedule.weekSchedule.filter(
        schedule => schedule.teacher.id === this.currentTeacher?.id
      );

      this.teacherSchedules.push(...teacherSchedulesInWeek);
    });

    if (this.teacherSchedules.length === 0) {
      this.errorMessage = 'No se encontraron horarios asignados para este profesor.';
    }
  }

  /**
   * Gets unique time slots from the teacher's schedule
   * @returns A sorted array of unique time slots
   */
  getUniqueTimeSlots(): string[] {
    if (this.teacherSchedules.length === 0) return [];

    const timeSlots = new Set<string>();
    this.teacherSchedules.forEach(schedule => {
      timeSlots.add(schedule.timeRange.start);
    });

    return Array.from(timeSlots).sort();
  }

  /**
   * Gets the schedules for a specific day and time slot
   * @param day - The day of the week to filter by
   * @param timeSlot - The time slot to filter by
   * @returns An array of schedules that match the day and time slot
   */
  getSchedulesForDayAndTime(day: string, timeSlot: string): Schedule[] {
    if (this.teacherSchedules.length === 0) return [];

    return this.teacherSchedules.filter(schedule =>
      schedule.dayOfWeek.toLowerCase() === day.toLowerCase() &&
      schedule.timeRange.start === timeSlot
    );
  }
}
