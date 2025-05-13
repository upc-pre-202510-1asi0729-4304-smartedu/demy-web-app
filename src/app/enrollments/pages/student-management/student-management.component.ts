import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
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
import { MatIcon } from "@angular/material/icon";
import {MatIconModule} from '@angular/material/icon';
import { NgClass } from "@angular/common";
import {MatIconButton} from '@angular/material/button';
import { StudentCreateFormComponent } from "../../components/student-create-and-edit/student-create-and-edit.component";
import { StudentService } from '../../services/student.service';
import {StudentAssembler} from '../../services/student.assembler';
import {Student} from '../../model/student.entity';

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
  protected student!: Student;

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
  private studentAssembler: StudentAssembler = inject(StudentAssembler);

  //#endregion

  //#region Methods

  /**
   * Initializes the component with default values and creates a new data source
   */
  constructor() {
    this.editMode = false;
    this.student = new Student();
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
  protected onEditItem(item: any) {
    this.editMode = true;
    this.student = this.studentAssembler.toEntityFromResource(item)
  }

  /**
   * Handles the delete action for a student
   * @param item - The student to be deleted
   */
  protected onDeleteItem(item: any) {
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
   * @param student - The new student to be added
   */
  protected onStudentAddRequested(student: Student) {
    this.student = student;
    this.createStudent();
    this.resetEditStudentState();
  }

  /**
   * Handles the update of an existing student
   * @param student - The student with updated information
   */
  protected onStudentUpdateRequested(student: Student) {
    this.student = student;
    this.updateStudent();
    this.resetEditStudentState();
  }

  /**
   * Resets the component's edit state to its default values.
   * Clears the current student data and exits edit mode.
   */
  private resetEditStudentState(): void {
    this.student = new Student()
    this.editMode = false;
  }

  /**
   * Retrieves all students from the service and updates the table's data source.
   * Uses StudentService to fetch the data via HTTP.
   */
  private getAllStudents() {
    this.studentService.getAllStudents().subscribe(students => {
      // Usar mappings para UI en la tabla si es necesario
      this.dataSource.data = students.map(student => ({
        dni: student.dni,
        first_name: student.firstName,
        last_name: student.lastName,
        sex: student.sex,
        birth_date: student.birthDate.toISOString().split('T')[0],
        _original: student // Mantener referencia a la entidad original
      }));


    });
  }

  /**
   * Creates a new student using the StudentService.
   * Updates the table's data source with the newly created student.
   */
  private createStudent() {
    this.studentService.createStudent(this.student).subscribe(createdStudent => {
      // Actualizar tabla con el estudiante creado
      const newTableItem = {
        dni: createdStudent.dni,
        first_name: createdStudent.firstName,
        last_name: createdStudent.lastName,
        sex: createdStudent.sex,
        birth_date: createdStudent.birthDate.toISOString().split('T')[0],
        // Otros campos
        _original: createdStudent
      };

      this.dataSource.data = [...this.dataSource.data, newTableItem];
    });
  }

  /**
   * Updates an existing student using the StudentService.
   * Updates the corresponding student in the table's data source.
   */
  private updateStudent() {
    this.studentService.updateStudent(this.student).subscribe(updatedStudent => {
      // Actualizar la tabla
      const index = this.dataSource.data.findIndex(item => item.dni === updatedStudent.dni);

      if (index !== -1) {
        const updatedData = [...this.dataSource.data];
        updatedData[index] = {
          dni: updatedStudent.dni,
          first_name: updatedStudent.firstName,
          last_name: updatedStudent.lastName,
          sex: updatedStudent.sex,
          birth_date: updatedStudent.birthDate.toISOString().split('T')[0],
          // Otros campos
          _original: updatedStudent
        };

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
    this.studentService.deleteStudent(dni).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(item => item.dni !== dni);
    });
  }
  //#endregion
}
