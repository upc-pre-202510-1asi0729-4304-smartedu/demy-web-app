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
import { MatIconModule } from '@angular/material/icon';
import { DatePipe, NgClass } from "@angular/common";
import { MatIconButton } from '@angular/material/button';
import { StudentCreateFormComponent } from "../../components/student-create-and-edit/student-create-and-edit.component";
import { StudentService } from '../../services/student.service';
import { Student } from '../../model/student.entity';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * Component for managing students via a table interface.
 * Allows creation, editing, deletion, and listing of students with sorting and pagination features.
 *
 * @export
 * @class StudentManagementComponent
 * @implements {OnInit}
 * @implements {AfterViewInit}
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
    DatePipe,
    TranslatePipe
  ],
  templateUrl: 'student-management.component.html',
  styleUrl: './student-management.component.css'
})
export class StudentManagementComponent implements OnInit, AfterViewInit {

  /** Current student enrollment being created or edited */
  protected studentData!: Student;

  /** Columns to display in the table */
  protected readonly columnsToDisplay: string[] = ['dni', 'firstName', 'lastName', 'sex', 'birthDate', 'actions'];

  /** Reference to Material paginator */
  @ViewChild(MatPaginator, { static: false })
  protected paginator!: MatPaginator;

  /** Reference to Material sort */
  @ViewChild(MatSort)
  protected sort!: MatSort;

  /** Flag indicating if component is in edit mode */
  protected editMode: boolean = false;

  /** Data source for the Material table */
  protected dataSource!: MatTableDataSource<any>;

  /** Service for student-related API operations */
  private studentService: StudentService = inject(StudentService);

  /**
   * Creates an instance of StudentManagementComponent.
   */
  constructor() {
    this.editMode = false;
    this.studentData = new Student({});
    this.dataSource = new MatTableDataSource();
    console.log(this.studentData);
  }

  /**
   * Lifecycle hook called after the component's view has been fully initialized.
   * Assigns the paginator and sort references to the table data source.
   */
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Lifecycle hook called on component initialization.
   * Loads the list of all students.
   */
  ngOnInit(): void {
    this.getAllStudents();
  }

  /**
   * Enables edit mode for a selected student.
   *
   * @param item The student to edit
   */
  protected onEditItem(item: any): void {
    this.editMode = true;
    this.studentData = item;
  }

  /**
   * Deletes the selected student.
   *
   * @param item The student to delete
   */
  protected onDeleteItem(item: Student): void {
    this.deleteStudent(item.id);
  }

  /**
   * Cancels current create or edit operation.
   * Resets the edit state and reloads student list.
   */
  protected onCancelRequested(): void {
    this.resetEditStudentState();
    this.getAllStudents();
  }

  /**
   * Adds a new student.
   *
   * @param student The student to add
   */
  protected onStudentAddRequested(student: Student): void {
    this.studentData = student;
    this.createStudent();
    this.resetEditStudentState();
  }

  /**
   * Updates an existing student.
   *
   * @param student The student to update
   */
  protected onStudentUpdateRequested(student: Student): void {
    this.studentData = student;
    this.updateStudent();
    this.resetEditStudentState();
  }

  /**
   * Resets the edit state to default.
   * Clears student data and disables edit mode.
   *
   * @private
   */
  private resetEditStudentState(): void {
    this.studentData = new Student({});
    this.editMode = false;
  }

  /**
   * Retrieves all students using the student service.
   * Updates the data source with the fetched student list.
   *
   * @private
   */
  private getAllStudents(): void {
    this.studentService.getAll().subscribe((response: Array<Student>) => {
      this.dataSource.data = response;
    });
  }

  /**
   * Creates a new student using the student service.
   * Appends the created student to the data source.
   *
   * @private
   */
  private createStudent(): void {
    this.studentService.create(this.studentData).subscribe((response: Student) => {
      this.dataSource.data = [...this.dataSource.data, response];
    });
  }

  /**
   * Updates an existing student using the student service.
   * Replaces the existing record in the data source.
   *
   * @private
   */
  private updateStudent(): void {
    const studentToUpdate = this.studentData;
    this.studentService.update(studentToUpdate.id, studentToUpdate).subscribe((response: Student) => {
      const index = this.dataSource.data.findIndex(s => s.id === response.id);
      const updatedData = [...this.dataSource.data];
      updatedData[index] = response;
      this.dataSource.data = updatedData;
    });
  }

  /**
   * Deletes a student by ID using the student service.
   * Removes the student from the data source.
   *
   * @param id ID of the student to delete
   * @private
   */
  private deleteStudent(id: string): void {
    this.studentService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(item => item.id !== id);
    });
  }
}
