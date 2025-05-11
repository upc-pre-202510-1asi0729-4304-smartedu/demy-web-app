
export class Student {
  //REVISAR LOS TIPOS DE CADA CAMPO
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
    this.birthDate = student.birthDate || null;
    this.address = student.address || '';
    this.phoneNumber = student.phoneNumber || '';
  }

  //constructor(id = '', firstName = '', lastName =' ', dni = '', sex = Sex.MALE, birthDate = new Date(), address = '', phoneNumber = '') {
  //  this.id = id;
  //  this.firstName = firstName;
  //  this.lastName = lastName
  //  this.dni = dni;
  //  this.sex = sex;
  //  this.birthDate = birthDate;
  //  this.address = address;
  //  this.phoneNumber = phoneNumber;
  //}
}

export enum Sex {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

