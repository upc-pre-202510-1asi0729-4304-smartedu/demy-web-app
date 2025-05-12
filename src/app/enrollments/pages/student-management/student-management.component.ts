import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { StudentRegistrationResource } from "../../services/students.response";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, MatSortHeader } from "@angular/material/sort";
import { StudentService } from '../../services/student.service';
import { StudentCreateFormComponent } from "../../components/student-create-and-edit/student-create-and-edit.component";
import { MatIcon } from "@angular/material/icon";
import {MatIconModule} from '@angular/material/icon';
import { NgClass } from "@angular/common";
import {MatIconButton} from '@angular/material/button';

/**
 * Component responsible for managing student enrollments through a table interface.
 * Provides functionality for viewing, creating, updating, and deleting student enrollments.
 * Features include pagination, sorting, and integrated CRUD operations.
 */
@Component({
  selector: 'app-student-management',
  standalone: true,
  imports: [
    StudentCreateFormComponent,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderCell,
    MatCell,
    MatIcon,
    MatHeaderRowDef,
    MatRowDef,
    NgClass,
    MatHeaderRow,
    MatRow,
    MatPaginator,
    MatSortHeader,
    MatIconModule,
    MatIconButton
  ],
  templateUrl: 'student-management.component.html',
  styleUrl: './student-management.component.css'
})
export class StudentManagementComponent implements OnInit, AfterViewInit {

  //#region Attributes

  /** Current student enrollment being created or edited */
  protected studentRegistration!: StudentRegistrationResource;

  /** Defines which columns should be displayed in the table and their order */
  protected columnsToDisplay: string[] = ['dni', 'first_name', 'last_name', 'sex', 'birth_date', 'actions'];

  /** Reference to the Material paginator for handling page-based data display */
  @ViewChild(MatPaginator, { static: false })
  protected paginator!: MatPaginator;

  /** Reference to the Material sort directive for handling column sorting */
  @ViewChild(MatSort)
  protected sort!: MatSort;

  /** Controls whether the component is in edit mode */
  protected editMode: boolean = false;

  /** Material table data source for managing and displaying student data */
  protected dataSource!: MatTableDataSource<any>;

  /** Service for handling student-related API operations */
  private studentService: StudentService = inject(StudentService);
  //#endregion

  //#region Methods

  /**
   * Initializes the component with default values and creates a new data source
   */
  constructor() {
    this.editMode = false;
    this.studentRegistration = {
      dni: '',
      first_name: '',
      last_name: '',
      sex: 'MALE',
      birth_date: '',
      address: '',
      phone_number: ''
    };
    this.dataSource = new MatTableDataSource();
  }

  /**
   * Lifecycle hook that runs after view initialization.
   * Sets up the Material table's paginator and sort functionality.
   */
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Lifecycle hook that runs on component initialization.
   * Loads the initial student data.
   */
  ngOnInit(): void {
    this.getAllStudents();
  }

  /**
   * Handles the edit action for a student
   * @param item - The student to be edited
   */
  protected onEditItem(item: StudentRegistrationResource) {
    this.editMode = true;
    this.studentRegistration = {...item};
  }

  /**
   * Handles the delete action for a student
   * @param item - The student to be deleted
   */
  protected onDeleteItem(item: StudentRegistrationResource) {
    this.deleteStudent(item.dni);
  }

  /**
   * Handles the cancellation of create/edit operations.
   * Resets the component state and refreshes the student list.
   */
  protected onCancelRequested() {
    this.resetEditStudentState();
    this.getAllStudents();
  }

  /**
   * Handles the addition of a new student
   * @param item - The new student to be added
   */
  protected onStudentAddRequested(item: StudentRegistrationResource) {
    this.studentRegistration = item;
    this.createStudent();
    this.resetEditStudentState();
  }

  /**
   * Handles the update of an existing student
   * @param item - The student with updated information
   */
  protected onStudentUpdateRequested(item: StudentRegistrationResource) {
    this.studentRegistration = item;
    this.updateStudent();
    this.resetEditStudentState();
  }

  /**
   * Resets the component's edit state to its default values.
   * Clears the current student data and exits edit mode.
   */
  private resetEditStudentState(): void {
    this.studentRegistration = {
      dni: '',
      first_name: '',
      last_name: '',
      sex: 'MALE',
      birth_date: '',
      address: '',
      phone_number: ''
    };
    this.editMode = false;
  }

  /**
   * Retrieves all students from the service and updates the table's data source.
   * Uses StudentService to fetch the data via HTTP.
   */
  private getAllStudents() {
    this.studentService.getAll().subscribe((response: Array<StudentRegistrationResource>) => {
      this.dataSource.data = response;
    });
  }

  /**
   * Creates a new student using the StudentService.
   * Updates the table's data source with the newly created student.
   */
  private createStudent() {
    this.studentService.create(this.studentRegistration).subscribe((response: StudentRegistrationResource) => {
      this.dataSource.data.push(response);
      this.dataSource.data = [...this.dataSource.data];
    });
  }

  /**
   * Updates an existing student using the StudentService.
   * Updates the corresponding student in the table's data source.
   */
  private updateStudent() {
    let studentToUpdate = this.studentRegistration;
    this.studentService.update(studentToUpdate.dni, studentToUpdate).subscribe((response: StudentRegistrationResource) => {
      // Encontrar el índice del estudiante en el array de datos
      const index = this.dataSource.data.findIndex((student: StudentRegistrationResource) => student.dni === response.dni);

      if (index !== -1) {
        // Crear una copia del array de datos
        const updatedData = [...this.dataSource.data];

        // Actualizar el estudiante en la posición correcta
        updatedData[index] = response;

        // Asignar los datos actualizados a la fuente de datos
        this.dataSource.data = updatedData;
      }
    });
  }

  /**
   * Deletes a student using the StudentService.
   * Removes the student from the table's data source.
   * @param dni - The DNI (ID) of the student to delete
   */
  private deleteStudent(dni: string) {
    this.studentService.delete(dni).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((student: StudentRegistrationResource) => student.dni !== dni);
    });
  }

  //#endregion
}
