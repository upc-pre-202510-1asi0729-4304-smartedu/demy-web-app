/**
 * Represents a student.
 */
export class Student {
  /** Student ID */
  id: string;

  /** First name */
  firstName: string;

  /** Last name */
  lastName: string;

  /** DNI (national ID number) */
  dni: string;

  /** Biological sex */
  sex: Sex;

  /** Date of birth */
  birthDate: Date | null;

  /** Home address */
  address: string;

  /** Phone number */
  phoneNumber: string;

  /**
   * Creates a Student instance.
   *
   * @param student - Partial data to initialize the entity
   */
  constructor(student: {
    id?: string;
    firstName?: string;
    lastName?: string;
    dni?: string;
    sex?: Sex;
    birthDate?: Date;
    address?: string;
    phoneNumber?: string;
  }) {
    this.id = student.id || '';
    this.firstName = student.firstName || '';
    this.lastName = student.lastName || '';
    this.dni = student.dni || '';
    this.sex = student.sex || Sex.MALE;
    this.birthDate = student.birthDate ?? null;
    this.address = student.address || '';
    this.phoneNumber = student.phoneNumber || '';
  }
}

/**
 * Biological sex.
 */
export enum Sex {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}
