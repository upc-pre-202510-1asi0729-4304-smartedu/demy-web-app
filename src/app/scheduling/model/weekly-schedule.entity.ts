import { Schedule } from './schedule.entity';

/**
 * Represents a weekly schedule entity in the system
 */
export class ScheduleWeekly {
  /** Unique identifier for the weekly schedule */
  id: number;

  // /** Academy ID associated with the weekly schedule (type not yet known) */
  // academyId: number;  // Uncomment and define the type when the academy ID field is needed

  /** Name of the weekly schedule */
  name: string;

  /** A list of daily schedules for the entire week */
  weekSchedule: Schedule[];

  /**
   * Creates a new ScheduleWeekly instance
   * @param scheduleWeekly - The weekly schedule initialization object
   * @param scheduleWeekly.id - The schedule ID (defaults to 0 if not provided)
   * @param scheduleWeekly.name - The name of the weekly schedule (defaults to an empty string if not provided)
   * @param scheduleWeekly.weekSchedule - The list of schedules for each day of the week (defaults to an empty array if not provided)
   */
  constructor(scheduleWeekly: { id?: number, name?: string, weekSchedule?: Schedule[] }) {
    this.id = scheduleWeekly.id || 0;
    // this.academyId = scheduleWeekly.academyId || 0;  // Uncomment and define when the academy ID is available
    this.name = scheduleWeekly.name || '';
    this.weekSchedule = scheduleWeekly.weekSchedule || [];
  }
}
