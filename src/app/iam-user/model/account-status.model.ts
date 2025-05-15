/**
 * Enum representing the possible statuses of a user account.
 * Used to control authentication, access, and lifecycle behavior.
 */
export enum AccountStatus {
  /**
   * Account is active and the user can access the system.
   */
  ACTIVE = 'ACTIVE',

  /**
   * Account is inactive and temporarily disabled from access.
   */
  INACTIVE = 'INACTIVE',

  /**
   * Account is blocked, typically due to security or policy violations.
   */
  BLOCKED = 'BLOCKED'
}
