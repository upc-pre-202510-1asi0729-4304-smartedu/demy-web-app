import { Injectable } from '@angular/core';
import { Student, Sex } from '../model/student.entity';
import { StudentResource, StudentRegistrationResource } from './students.response';

@Injectable({
  providedIn: 'root'
})
export class StudentAssembler {
  // De API Resource a Entidad de dominio
  toEntityFromResource(studentResource: StudentResource): Student {
    return new Student(
      studentResource.id,
      studentResource.first_name,  // Corregido el orden según la definición de Student
      studentResource.last_name,
      studentResource.dni,
      studentResource.sex as Sex,
      new Date(studentResource.birth_date),
      studentResource.address,
      studentResource.phone_number
    );
  }

  // De entidad de dominio a Resource para API (para operaciones de actualización)
  toResourceFromEntity(student: Student): StudentResource {
    return {
      id: student.id,
      dni: student.dni,
      first_name: student.firstName,
      last_name: student.lastName,
      sex: student.sex,
      birth_date: student.birthDate.toISOString().split('T')[0],
      address: student.address,
      phone_number: student.phoneNumber
    };
  }

  // De Resource de registro sin ID a entidad
  toEntityFromRegistrationResource(resource: StudentRegistrationResource): Student {
    return new Student(
      '',  // ID vacío ya que es un registro nuevo
      resource.first_name,
      resource.last_name,
      resource.dni,
      resource.sex as Sex,
      new Date(resource.birth_date),
      resource.address,
      resource.phone_number
    );
  }

  // De entidad a Resource de registro (para creación)
  toRegistrationResourceFromEntity(student: Student): StudentRegistrationResource {
    return {
      dni: student.dni,
      first_name: student.firstName,
      last_name: student.lastName,
      sex: student.sex,
      birth_date: student.birthDate.toISOString().split('T')[0],
      address: student.address,
      phone_number: student.phoneNumber
    };
  }

  // Convertir colección
  toEntitiesFromResources(resources: StudentResource[]): Student[] {
    return resources.map(resource => this.toEntityFromResource(resource));
  }
}
