import {Injectable} from '@angular/core';
import {Student} from '../model/student.entity';
import {StudentResource} from './students.response';
import {Sex} from "../model/student.entity";
@Injectable({
  providedIn: 'root'
})

export class StudentAssembler {

  toEntityFromResource(studentResource: StudentResource): Student {
    let sexEnum = studentResource.sex as Sex

    return new Student(
      studentResource.id,
      studentResource.dni,
      studentResource.first_name,
      studentResource.last_name,
      sexEnum,
      new Date(studentResource.birth_date),
      studentResource.address,
      studentResource.phone_number);
  }
  toEntitiesFromResponse(response: StudentResource[]): Student[] {
    return response.map(student => this.toEntityFromResource(student));
  }
}
