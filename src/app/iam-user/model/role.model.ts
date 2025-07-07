/**
 * Enum representing the different roles a user can have within the system.
 *
 * @summary
 * Determines the user's access level and available features based on their role.
 */
export enum Role {
  /**
   * Administrator with full access to all system management and configuration features.
   */
  ADMIN = 'ADMIN',

  /**
   * Teacher with access limited to academic and course-related functionalities.
   */
  TEACHER = 'TEACHER'
}
