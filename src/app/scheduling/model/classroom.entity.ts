export class Classroom {
  id: number;
  code: string;
  capacity: number;
  sede: string;

  constructor(classroom: {id?: number, code?: string, capacity?: number, sede?: string}) {
    this.id = classroom.id || 0;
    this.code = classroom.code  || '';
    this.capacity = classroom.capacity || 0;
    this.sede = classroom.sede || '';
  }
}
