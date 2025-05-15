/**
 * Enum representing the possible roles a user can have in the system.
 * Used to determine access levels and permissions.
 */
export enum Role {
  /**
   * Administrator with full access to all system features.
   */
  ADMIN = 'ADMIN',

  /**
   * Teacher with access limited to teaching and course-related features.
   */
  TEACHER = 'TEACHER'
}
