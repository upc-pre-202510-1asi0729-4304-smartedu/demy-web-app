import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { WeeklyScheduleService } from '../../services/weekly-schedule.service';
import { ScheduleWeekly } from '../../model/weekly-schedule.entity';
import { Schedule } from '../../model/schedule.entity';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-weekly-schedule-search',
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
  templateUrl: './weekly-schedule-search.component.html',
  styleUrl: './weekly-schedule-search.component.css'
})
export class WeeklyScheduleSearchComponent {
  // Form group for search
  searchForm: FormGroup;

  // List of all available weekly schedules
  availableSchedules: ScheduleWeekly[] = [];

  // State of loading
  isLoading = false;

  // Error message
  errorMessage: string | null = null;

  // Current weekly schedule
  currentWeeklySchedule: ScheduleWeekly | null = null;

  // Days of the week for table headers
  weekDays = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
  ];



  constructor(
    private weeklyScheduleService: WeeklyScheduleService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      scheduleSelect: ['']
    });

    // Cargar horarios al construir el componente
    this.loadAvailableSchedules();
  }

  /**
   * Load all available weekly schedules
   */
  loadAvailableSchedules(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.weeklyScheduleService.getAll().subscribe({
      next: (schedules) => {
        this.availableSchedules = schedules;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching weekly schedules:', error);
        this.errorMessage = 'Ocurrió un error al cargar los horarios semanales. Por favor, intente nuevamente.';
        this.isLoading = false;
      }
    });
  }

  /**
   * Search for a weekly schedule
   */
  searchWeeklySchedule(): void {
    const selectedScheduleId = this.searchForm.get('scheduleSelect')?.value;

    // Reset previous state
    this.errorMessage = null;
    this.currentWeeklySchedule = null;

    // If a schedule is selected from dropdown
    if (selectedScheduleId) {
      this.currentWeeklySchedule = this.availableSchedules.find(
        schedule => schedule.id === selectedScheduleId
      ) || null;

      if (!this.currentWeeklySchedule) {
        this.errorMessage = 'No se pudo encontrar el horario seleccionado.';
      }
      return;
    }

    // If no schedule selected
    this.errorMessage = 'Por favor, seleccione un horario.';
  }

  /**
   * Get unique time slots
   */
  getUniqueTimeSlots(): string[] {
    if (!this.currentWeeklySchedule) return [];

    const timeSlots = new Set<string>();
    this.currentWeeklySchedule.weekSchedule.forEach(schedule => {
      timeSlots.add(schedule.timeRange.start);
    });

    return Array.from(timeSlots).sort();
  }

  /**
   * Get schedules for a specific day and time
   */
  getSchedulesForDayAndTime(day: string, timeSlot: string): Schedule[] {
    if (!this.currentWeeklySchedule) return [];

    // Filtrar directamente por el día traducido y la hora
    return this.currentWeeklySchedule.weekSchedule.filter(schedule =>
      schedule.dayOfWeek.toLowerCase() === day.toLowerCase() &&
      schedule.timeRange.start === timeSlot
    );
  }
}
