import { Course } from './course.entity';
import { Classroom } from './classroom.entity';
import { UserAccount } from '../../iam-user/model/user.entity';

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

  teacher: UserAccount; // To be added once the Teacher entity is included

  /**
   * Creates a new Schedule instance
   * @param schedule - The schedule initialization object
   * @param schedule.id - The schedule ID (defaults to 0 if not provided)
   * @param schedule.dayOfWeek - The day of the week (defaults to an empty string if not provided)
   * @param schedule.timeRange - The time range for the schedule (defaults to an empty time range if not provided)
   * @param schedule.course - The course for the schedule (defaults to a new Course instance if not provided)
   * @param schedule.classroom - The classroom for the schedule (defaults to a new Classroom instance if not provided)
   * @param schedule.startTime - Backend format start time
   * @param schedule.endTime - Backend format end time
   * @param schedule.courseId - Backend format course ID
   * @param schedule.classroomId - Backend format classroom ID
   * @param schedule.teacherId - Backend format teacher ID
   */
  constructor(schedule: {
    id?: number,
    dayOfWeek?: string, //DayOfWeek
    timeRange?: TimeRange,
    course?: Course,
    classroom?: Classroom,
    teacher?: UserAccount,  // To be added once the Teacher entity is included
    startTime?: string,
    endTime?: string,
    courseId?: number,
    classroomId?: number,
    teacherId?: number
  }) {
    this.id = schedule.id || 0;
    this.dayOfWeek = schedule.dayOfWeek || '';

    // Handle both frontend and backend time formats
    if (schedule.timeRange) {
      this.timeRange = schedule.timeRange;
    } else if (schedule.startTime && schedule.endTime) {
      this.timeRange = { start: schedule.startTime, end: schedule.endTime };
    } else {
      this.timeRange = { start: '', end: '' };
    }

    // Handle both frontend and backend course formats
    if (schedule.course) {
      this.course = schedule.course;
    } else if (schedule.courseId) {
      this.course = new Course({ id: schedule.courseId });
    } else {
      this.course = new Course({});
    }

    // Handle both frontend and backend teacher formats
    if (schedule.teacher) {
      this.teacher = schedule.teacher;
    } else if (schedule.teacherId) {
      this.teacher = new UserAccount({ id: schedule.teacherId });
    } else {
      this.teacher = new UserAccount({});
    }

    // Handle both frontend and backend classroom formats
    if (schedule.classroom) {
      this.classroom = schedule.classroom;
    } else if (schedule.classroomId) {
      this.classroom = new Classroom({ id: schedule.classroomId });
    } else {
      this.classroom = new Classroom({});
    }
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
