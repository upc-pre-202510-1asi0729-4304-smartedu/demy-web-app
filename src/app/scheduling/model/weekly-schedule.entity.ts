import { Schedule } from './schedule.entity';

export class ScheduleWeekly {
  id: number;
  //academyId: number;   Campo para el ID de la academia, el tipo de dato no se sabe
  name: string;
  weekSchedule: Schedule[];

  constructor(scheduleWeekly: { id?: number, name?: string, weekSchedule?: Schedule[] }) {
    this.id = scheduleWeekly.id || 0;
    // this.academyId = scheduleWeekly.academyId || 0;
    this.name = scheduleWeekly.name || '';
    this.weekSchedule = scheduleWeekly.weekSchedule || [];
  }
}
