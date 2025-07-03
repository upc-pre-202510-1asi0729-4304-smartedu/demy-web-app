import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { TranslatePipe } from '@ngx-translate/core';

/**
 * Component for searching and displaying weekly schedules.
 * Provides a search form and displays the available weekly schedules based on the selected schedule.
 */
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
  styleUrls: ['./weekly-schedule-search.component.css']
})
export class WeeklyScheduleSearchComponent implements OnInit {

  /** Input for pre-selected schedule ID */
  @Input() selectedScheduleId: string | number = '';

  /** Output event when a schedule is selected */
  @Output() scheduleSelected = new EventEmitter<ScheduleWeekly>();

  /** Form group for search input */
  searchForm: FormGroup;

  /** List of all available weekly schedules */
  availableSchedules: ScheduleWeekly[] = [];

  /** State of loading */
  isLoading = false;

  /** Error message */
  errorMessage: string | null = null;

  /** Current selected weekly schedule */
  currentWeeklySchedule: ScheduleWeekly | null = null;

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

  /** Time slots from 7:00 AM to 9:00 PM in 30-minute intervals */
  timeSlots = [
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
   * Initializes the component and loads available weekly schedules
   * @param weeklyScheduleService - Service used to fetch weekly schedules from the backend
   * @param fb - FormBuilder instance used to build the form group
   */
  constructor(
    private weeklyScheduleService: WeeklyScheduleService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      scheduleSelect: [this.selectedScheduleId]
    });
  }

  ngOnInit(): void {
    this.loadAvailableSchedules();
  }

  /**
   * Loads all available weekly schedules from the service
   */
  loadAvailableSchedules(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.weeklyScheduleService.getAll().subscribe({
      next: (schedules) => {
        this.availableSchedules = schedules;
        this.isLoading = false;

        // If there's a pre-selected schedule, set it in the form but don't search automatically
        if (this.selectedScheduleId) {
          this.searchForm.patchValue({ scheduleSelect: this.selectedScheduleId });
        }
      },
      error: (error) => {
        console.error('Error fetching weekly schedules:', error);
        this.errorMessage = 'An error occurred while loading weekly schedules. Please try again.';
        this.isLoading = false;
      }
    });
  }

  /**
   * Searches for a weekly schedule based on the selected schedule ID
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
        this.errorMessage = 'Could not find the selected schedule.';
      } else {
        // Emit the selected schedule to parent
        this.scheduleSelected.emit(this.currentWeeklySchedule);
      }
      return;
    }

    // If no schedule selected
    this.errorMessage = 'Please select a schedule.';
  }

  /**
   * Called when schedule selection changes
   */
  onScheduleChange(): void {
    // Reset the current schedule when selection changes
    // Don't automatically search - wait for button click
    this.currentWeeklySchedule = null;
    this.errorMessage = null;
  }

  /**
   * Gets the schedules for a specific day and time slot
   * @param day - The day of the week to filter by
   * @param timeSlot - The time slot to filter by
   * @returns An array of schedules that match the day and time slot
   */
  getSchedulesForDayAndTime(day: string, timeSlot: string): Schedule[] {
    if (!this.currentWeeklySchedule) return [];

    return this.currentWeeklySchedule.weekSchedule.filter(schedule => {
      const scheduleDayOfWeek = schedule.dayOfWeek.toLowerCase();
      const [startHour, startMinute] = schedule.timeRange.start.split(':').map(Number);
      const [endHour, endMinute] = schedule.timeRange.end.split(':').map(Number);
      const [slotHour, slotMinute] = timeSlot.split(':').map(Number);

      const startTimeInMinutes = startHour * 60 + startMinute;
      const endTimeInMinutes = endHour * 60 + endMinute;
      const slotTimeInMinutes = slotHour * 60 + slotMinute;

      return scheduleDayOfWeek === day.toLowerCase() &&
        slotTimeInMinutes >= startTimeInMinutes &&
        slotTimeInMinutes < endTimeInMinutes;
    });
  }

  /**
   * Gets all time slots (always returns the complete 30-minute interval slots)
   */
  getUniqueTimeSlots(): string[] {
    return this.timeSlots;
  }

  /**
   * Checks if search is disabled
   */
  get isSearchDisabled(): boolean {
    return !this.searchForm.get('scheduleSelect')?.value;
  }
}
