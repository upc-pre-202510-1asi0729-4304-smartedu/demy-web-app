/**
 * Represents a user account within the system.
 *
 * @summary
 * Encapsulates user information including credentials, role, and account status.
 * Provides methods to manage user state such as activation, blocking, and updating credentials.
 */
export class UserAccount {
  /**
   * Unique identifier of the user account.
   */
  id: number;

  /**
   * Full name of the user.
   */
  fullName: string;

  /**
   * Email address associated with the account.
   */
  email: string;

  /**
   * Hashed password used for authentication.
   */
  passwordHash: string;

  /**
   * Role assigned to the user (e.g., ADMIN, TEACHER).
   */
  role: string;

  /**
   * Current status of the user account (e.g., ACTIVE, BLOCKED, INACTIVE).
   */
  status: string;

  /**
   * Creates a new {@link UserAccount} instance.
   *
   * @param user - A partial object containing user account properties.
   * If a property is missing, a default value is assigned.
   */
  constructor(user: {id?: number, fullName?: string, email?: string, passwordHash?: string, role?: string, status?: string}) {
    this.id = user.id || 0;
    this.fullName = user.fullName  || '';
    this.email = user.email  || '';
    this.passwordHash = user.passwordHash  || '';
    this.role = user.role  || Role.TEACHER;
    this.status = user.status  || AccountStatus.INACTIVE;
  }

  /**
   * Sets the account status to `ACTIVE`.
   */
  activate(): void {
    this.status = AccountStatus.ACTIVE;
  }

  /**
   * Sets the account status to `INACTIVE`.
   */
  deactivate(): void {
    this.status = AccountStatus.INACTIVE;
  }

  /**
   * Sets the account status to `BLOCKED`.
   */
  block(): void {
    this.status = AccountStatus.BLOCKED;
  }

  /**
   * Updates the password hash for the account.
   *
   * @param newHash - The new hashed password to assign.
   */
  changePassword(newHash: string): void {
    this.passwordHash = newHash;
  }

  /**
   * Updates the email address associated with the account.
   *
   * @param newEmail - The new email to assign.
   */
  updateEmail(newEmail: string): void {
    this.email = newEmail;
  }
}

/**
 * Enum representing the possible roles of a user in the system.
 */
export enum Role {
  /**
   * Administrator with full access to the system.
   */
  ADMIN = 'ADMIN',

  /**
   * Teacher with restricted access to teaching-related features.
   */
  TEACHER = 'TEACHER'
}

/**
 * Enum representing the possible account status values.
 */
export enum AccountStatus {
  /**
   * Account is active and usable.
   */
  ACTIVE = 'ACTIVE',

  /**
   * Account is inactive and not permitted to log in.
   */
  INACTIVE = 'INACTIVE',

  /**
   * Account has been blocked and access is denied.
   */
  BLOCKED = 'BLOCKED'
}
