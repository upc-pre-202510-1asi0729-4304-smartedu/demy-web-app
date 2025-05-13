export class UserAccount {
  id: number;
  fullName: string;
  email: string;
  passwordHash: string;
  role: string;
  status: string;

  constructor(user: {id?: number, fullName?: string, email?: string, passwordHash?: string, role?: string, status?: string}) {
    this.id = user.id || 0;
    this.fullName = user.fullName  || '';
    this.email = user.email  || '';
    this.passwordHash = user.passwordHash  || '';
    this.role = user.role  || Role.TEACHER;
    this.status = user.status  || AccountStatus.INACTIVE;
  }

  activate(): void {
    this.status = AccountStatus.ACTIVE;
  }

  deactivate(): void {
    this.status = AccountStatus.INACTIVE;
  }

  block(): void {
    this.status = AccountStatus.BLOCKED;
  }

  changePassword(newHash: string): void {
    this.passwordHash = newHash;
  }

  updateEmail(newEmail: string): void {
    this.email = newEmail;
  }

}

enum Role {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER'
}

enum AccountStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BLOCKED = 'BLOCKED'
}
