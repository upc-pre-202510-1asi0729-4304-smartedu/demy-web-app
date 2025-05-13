import { Course } from './course.entity';
import { Classroom } from './classroom.entity';
import { Teacher } from '../../iam-user/model/user.entity';

/**
 * Represents a time range with a start and end time
 */
export interface TimeRange {
  /** The starting time of the range */
  start: string;

  /** The ending time of the range */
  end: string;
}

/**
 * Represents a schedule entry for a course in the system
 */
export class Schedule {
  /** Unique identifier for the schedule entry */
  id: number;

  /** The day of the week the schedule is for */
  dayOfWeek: string;

  /** The time range for the schedule (start and end times) */
  timeRange: TimeRange;

  /** The course associated with the schedule */
  course: Course;

  /** The classroom associated with the schedule */
  classroom: Classroom;

  // teacher: Teacher; // To be added once the Teacher entity is included

  /**
   * Creates a new Schedule instance
   * @param schedule - The schedule initialization object
   * @param schedule.id - The schedule ID (defaults to 0 if not provided)
   * @param schedule.dayOfWeek - The day of the week (defaults to an empty string if not provided)
   * @param schedule.timeRange - The time range for the schedule (defaults to an empty time range if not provided)
   * @param schedule.course - The course for the schedule (defaults to a new Course instance if not provided)
   * @param schedule.classroom - The classroom for the schedule (defaults to a new Classroom instance if not provided)
   */
  constructor(schedule: {
    id?: number,
    dayOfWeek?: string, //DayOfWeek
    timeRange?: TimeRange,
    course?: Course,
    classroom?: Classroom
    //teacher?: Teacher  // To be added once the Teacher entity is included
  }) {
    this.id = schedule.id || 0;
    this.dayOfWeek = schedule.dayOfWeek || '';
    this.timeRange = schedule.timeRange || { start: '', end: '' };
    this.course = schedule.course || new Course({});
    this.classroom = schedule.classroom || new Classroom({});
  }
}

/**
 * Enum representing the days of the week

enum DayOfWeek {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday'
}
 */
