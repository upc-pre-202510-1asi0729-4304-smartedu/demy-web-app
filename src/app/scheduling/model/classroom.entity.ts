/**
 * Represents a classroom entity in the system
 */
export class Classroom {
  /** Unique identifier for the classroom */
  id: number;

  /** Code or identifier for the classroom */
  code: string;

  /** Capacity of the classroom (the number of students it can hold) */
  capacity: number;

  /** Campus where the classroom is located */
  campus: string;

  /**
   * Creates a new Classroom instance
   * @param classroom - The classroom initialization object
   * @param classroom.id - The classroom ID (defaults to 0 if not provided)
   * @param classroom.code - The classroom code (defaults to an empty string if not provided)
   * @param classroom.capacity - The classroom capacity (defaults to 0 if not provided)
   * @param classroom.campus - The campus name where the classroom is located (defaults to an empty string if not provided)
   */
  constructor(classroom: {id?: number, code?: string, capacity?: number, campus?: string}) {
    this.id = classroom.id || 0;
    this.code = classroom.code || '';
    this.capacity = classroom.capacity || 0;
    this.campus = classroom.campus || '';
  }
}
