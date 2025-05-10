export class Course {
  id: number;
  name: string;
  code: string;
  description: string;

  constructor(course: {id?: number, name?: string, code?: string, description?: string}) {
    this.id = course.id || 0;
    this.name = course.name  || '';
    this.code = course.code || '';
    this.description = course.description || '';
  }
}
