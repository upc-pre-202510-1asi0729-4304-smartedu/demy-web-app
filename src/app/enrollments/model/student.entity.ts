export class Student {
  //REVISAR LOS TIPOS DE CADA CAMPO
  id: string;
  firstName: string;
  lastName: string;
  dni: string
  sex: Sex;
  birthDate: Date;
  address: string;
  phoneNumber: string;

  constructor(id = '', firstName = '', lastName =' ', dni = '', sex = Sex.MALE, birthDate = new Date(), address = '', phoneNumber = '') {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName
    this.dni = dni;
    this.sex = sex;
    this.birthDate = birthDate;
    this.address = address;
    this.phoneNumber = phoneNumber;
  }
}

export enum Sex {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}


