export class Student {
  //REVISAR LOS TIPOS DE CADA CAMPO
  id: string;
  firstName: string;
  lastName: string;
  dni: string
  sex: Sex;
  age: number;
  address: string;
  studentPhoneNumber?: string;
  parentPhoneNumber: string;

  constructor(id = '', firstName = '', lastName =' ', dni = '', sex = Sex.MALE, age = 0, address = '', studentPhoneNumber = '', parentPhoneNumber = '') {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName
    this.dni = dni;
    this.sex = sex;
    this.age = age;
    this.address = address;
    this.parentPhoneNumber = parentPhoneNumber;
    this.studentPhoneNumber = studentPhoneNumber;
  }
}

export enum Sex {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}


