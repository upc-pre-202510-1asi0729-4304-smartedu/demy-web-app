/**
 * Represents a course entity in the system
 */
export class Course {
  /** Unique identifier for the course */
  id: number;

  /** Name of the course */
  name: string;

  /** Code associated with the course */
  code: string;

  /** Detailed description of the course content */
  description: string;

  /**
   * Creates a new Course instance
   * @param course - The course initialization object
   * @param course.id - The course ID (defaults to 0 if not provided)
   * @param course.name - The course name (defaults to an empty string if not provided)
   * @param course.code - The course code (defaults to an empty string if not provided)
   * @param course.description - The course description (defaults to an empty string if not provided)
   */
  constructor(course: {id?: number, name?: string, code?: string, description?: string}) {
    this.id = course.id || 0;
    this.name = course.name || '';
    this.code = course.code || '';
    this.description = course.description || '';
  }
}
