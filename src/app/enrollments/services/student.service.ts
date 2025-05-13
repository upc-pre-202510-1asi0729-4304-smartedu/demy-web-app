import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { environment } from '../../../environments/environment';
import { StudentResource } from './students.response';
import { Student } from '../model/student.entity';
import { StudentAssembler } from './student.assembler';
import { Observable, map } from 'rxjs';

/**
 * Service responsible for student domain operations.
 * Acts as an application service that orchestrates between domain and infrastructure.
 */

@Injectable({
  providedIn: 'root'
})
export class StudentApiService extends BaseService<StudentResource> {
  constructor() {
    super();
    this.resourceEndpoint = environment.studentsEndpointPath;
  }
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiService: StudentApiService;
  private assembler: StudentAssembler;

  /**
   * Initializes the StudentService with required dependencies.
   */
  constructor(apiService: StudentApiService, assembler: StudentAssembler) {
    this.apiService = apiService;
    this.apiService.resourceEndpoint = environment.studentsEndpointPath;
    this.assembler = assembler;
  }

  /**
   * Retrieves all students as domain entities.
   */
  public getAllStudents(): Observable<Student[]> {
    return this.apiService.getAll().pipe(
      map(resources => this.assembler.toEntitiesFromResources(resources))
    );
  }

  /**
   * Creates a new student.
   * @param student - The student domain entity to create
   */
  public createStudent(student: Student): Observable<Student> {
    const resource = this.assembler.toRegistrationResourceFromEntity(student);
    return this.apiService.create(resource as unknown as StudentResource).pipe(
      map(createdResource => this.assembler.toEntityFromResource(createdResource))
    );
  }

  /**
   * Updates an existing student.
   * @param student - The student domain entity with updated information
   */
  public updateStudent(student: Student): Observable<Student> {
    const resource = this.assembler.toResourceFromEntity(student);
    return this.apiService.update(student.dni, resource).pipe(
      map(updatedResource => this.assembler.toEntityFromResource(updatedResource))
    );
  }

  /**
   * Deletes a student by DNI.
   * @param dni - The DNI of the student to delete
   */
  public deleteStudent(dni: string): Observable<void> {
    return this.apiService.delete(dni);
  }

  /**
   * Retrieves a student by DNI.
   * @param dni - The DNI of the student to retrieve
   */
  public getStudentByDni(dni: string): Observable<Student> {
    return this.apiService.getById(dni).pipe(
      map(resource => this.assembler.toEntityFromResource(resource))
    );
  }
}
