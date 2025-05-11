import { Course } from './course.entity';
import { Classroom } from './classroom.entity';
//import { Teacher } from './teacher.entity';

export interface TimeRange {
  start: string;
  end: string;
}

export class Schedule {
  id: number;
  dayOfWeek: string;
  timeRange: TimeRange;
  course: Course;
  classroom: Classroom;
  //teacher: Teacher; //Despues de agregar el profesor

  constructor(schedule: {
    id?: number,
    dayOfWeek?: string,
    timeRange?: TimeRange,
    course?: Course,
    classroom?: Classroom
    //teacher?: Teacher  //Despues de agregar el profesor
  }) {
    this.id = schedule.id || 0;
    this.dayOfWeek = schedule.dayOfWeek || '';
    this.timeRange = schedule.timeRange || { start: '', end: '' };
    this.course = schedule.course || new Course({});
    this.classroom = schedule.classroom || new Classroom({});
  }
}
