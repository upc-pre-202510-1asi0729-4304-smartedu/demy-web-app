/**
 * Represents a course within the attendance system.
 * This model is typically used to populate dropdown selections with course names.
 */
export class Course {
  /**
   * Creates a new instance of the Course class.
   *
   * @param id - The unique identifier of the course.
   * @param name - The display name of the course.
   */
  constructor(
    public id: string,
    public name: string
  ) {}
  /**
   * Creates a Course instance from a plain JSON object.
   *
   * @param json - A raw object from the API containing `id` and `name` fields.
   * @returns A new Course instance.
   */
  static fromJson(json: any): Course {
    return new Course(json.id, json.name);
  }
}
