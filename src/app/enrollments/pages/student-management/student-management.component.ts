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
import {DatePipe, NgClass} from "@angular/common";
import {MatIconButton} from '@angular/material/button';
import { StudentCreateFormComponent } from "../../components/student-create-and-edit/student-create-and-edit.component";
import { StudentService } from '../../services/student.service';
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
    MatIconButton,
    DatePipe
  ],
  templateUrl: 'student-management.component.html',
  styleUrl: './student-management.component.css'
})
export class StudentManagementComponent implements OnInit, AfterViewInit {

  //#region Attributes

  /** Current student enrollment being created or edited */
  protected studentData !: Student
  /** Defines which columns should be displayed in the table and their order */
  protected readonly columnsToDisplay: string[] = ['dni', 'firstName', 'lastName', 'sex', 'birthDate', 'actions'];

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
    this.studentData = new Student({});
    this.dataSource = new MatTableDataSource();
    console.log(this.studentData);
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
    this.studentData = item;
  }

  /**
   * Handles the delete action for a student
   * @param item - The student to be deleted
   */
  protected onDeleteItem(item: Student) {
    this.deleteStudent(item.id);
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
    this.studentData = student;
    this.createStudent();
    this.resetEditStudentState();
  }

  /**
   * Handles the update of an existing student
   * @param student - The student with updated information
   */
  protected onStudentUpdateRequested(student: Student) {
    this.studentData = student;
    this.updateStudent();
    this.resetEditStudentState();
  }

  /**
   * Resets the component's edit state to its default values.
   * Clears the current student data and exits edit mode.
   */
  private resetEditStudentState(): void {
    this.studentData = new Student({})
    this.editMode = false;
  }

  /**
   * Retrieves all students from the service and updates the table's data source.
   * Uses StudentService to fetch the data via HTTP.
   */
  private getAllStudents() {
    this.studentService.getAll().subscribe((response: Array<Student>)=> {
      this.dataSource.data = response;
      });
    }

  /**
   * Creates a new student using the StudentService.
   * Updates the table's data source with the newly created student.
   */
  private createStudent() {
    this.studentService.create(this.studentData).subscribe((response: Student) => {
      this.dataSource.data = [...this.dataSource.data, response];
    });
  }

  /**
   * Updates an existing student using the StudentService.
   * Updates the corresponding student in the table's data source.
   */
  private updateStudent() {
    const studentToUpdate = this.studentData;
    this.studentService.update(studentToUpdate.id, studentToUpdate).subscribe((response: Student) => {
      const index = this.dataSource.data.findIndex(s => s.id === response.id);
      const updatedData = [...this.dataSource.data];
      updatedData[index] = response;
      this.dataSource.data = updatedData;
    });
  }

  /**
   * Deletes a student using the StudentService.
   * Removes the student from the table's data source.
   * @param id - The DNI (ID) of the student to delete
   */
  private deleteStudent(id: string) {
    this.studentService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(item => item.id !== id);
    });
  }
  //#endregion
}
