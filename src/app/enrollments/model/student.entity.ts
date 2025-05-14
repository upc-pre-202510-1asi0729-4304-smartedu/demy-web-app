export class Student {
  id: string;
  firstName: string;
  lastName: string;
  dni: string
  sex: Sex;
  birthDate: Date | null;
  address: string;
  phoneNumber: string;

  constructor(student: {id?: string, firstName?: string, lastName?: string,
      dni?: string, sex?:Sex, birthDate?: Date, address?: string, phoneNumber?: string}) {
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

export enum Sex {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

