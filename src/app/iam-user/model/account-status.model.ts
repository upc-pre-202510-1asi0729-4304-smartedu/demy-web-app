/**
 * Enum representing the possible statuses of a user account.
 *
 * @summary
 * Defines the authentication and access state of a user's account throughout its lifecycle.
 */
export enum AccountStatus {
  /**
   * The account is active and the user is allowed to access the system.
   */
  ACTIVE = 'ACTIVE',

  /**
   * The account is inactive and temporarily restricted from accessing the system.
   * Typically used for unverified or deactivated users.
   */
  INACTIVE = 'INACTIVE',

  /**
   * The account is blocked due to violations, security issues, or administrative actions.
   * Access is completely denied until further action is taken.
   */
  BLOCKED = 'BLOCKED'
}
