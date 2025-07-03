/**
 * Represents a user account within the system.
 * Includes authentication credentials, user role, and account status.
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
   * Current status of the user account (e.g., ACTIVE, BLOCKED).
   */
  status: string;

  /**
   * Creates a new {@link UserAccount} instance from a partial user object.
   *
   * @param user - Object containing optional user account fields.
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
   * Updates the hashed password of the account.
   *
   * @param newHash - The new password hash.
   */
  changePassword(newHash: string): void {
    this.passwordHash = newHash;
  }

  /**
   * Updates the email address associated with the account.
   *
   * @param newEmail - The new email address.
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
 * Enum representing the possible statuses of a user account.
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
