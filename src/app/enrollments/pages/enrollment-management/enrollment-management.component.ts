import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import {
  MatTable,
  MatTableDataSource,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatCell,
  MatCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef
} from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, MatSortHeader } from "@angular/material/sort";
import { MatIcon } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import {DatePipe, NgClass} from "@angular/common";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EnrollmentsCreateFormComponent } from '../../components/enrollments-create-and-edit/enrollments-create-and-edit.component';
import { EnrollmentService } from '../../services/enrollment.service';
import { Enrollment } from '../../model/enrollment.entity';
import { StudentService } from '../../services/student.service';
import { AcademicPeriodService } from '../../services/academic-period.service';
import {TranslatePipe} from '@ngx-translate/core';

/**
 * Component responsible for managing enrollments through a table interface.
 * Provides functionality for viewing, creating, updating, and deleting enrollments.
 */
@Component({
  selector: 'app-enrollments-management',
  standalone: true,
  imports: [
    EnrollmentsCreateFormComponent,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatPaginator,
    MatSort,
    MatSortHeader,
    MatIcon,
    MatButtonModule,
    NgClass,
    MatFormFieldModule,
    MatInputModule,
    DatePipe,
    TranslatePipe
  ],
  templateUrl: 'enrollment-management.component.html',
  styleUrl: 'enrollment-management.component.css'
})
export class EnrollmentsManagementComponent implements OnInit, AfterViewInit {

  //#region Attributes

  /** Current enrollment being created or edited */
  protected enrollmentData !: Enrollment;

  /** Defines which columns should be displayed in the table and their order */
  protected columnsToDisplay: string[] = [
    'enrollment_id',
    'student_id',
    'period_id',
    'created_at',
    'amount',
    'enrollmentStatus',
    'paymentStatus',
    'actions'
  ];

  /** Reference to the Material paginator for handling page-based data display */
  @ViewChild(MatPaginator, { static: false })
  protected paginator!: MatPaginator;

  /** Reference to the Material sort directive for handling column sorting */
  @ViewChild(MatSort)
  protected sort!: MatSort;

  /** Controls whether the component is in edit mode */
  protected editMode: boolean = false;

  /** Material table data source for managing and displaying enrollment data */
  protected dataSource: MatTableDataSource<any>;

  /** Service for handling enrollment-related API operations */
  private enrollmentService: EnrollmentService = inject(EnrollmentService);

  /** Maps for storing student and period data */
  protected studentMap = new Map<number, string>();
  protected periodMap = new Map<number, string>();

  /** Services for students and academic periods */
  private studentService = inject(StudentService);
  private academicPeriodService = inject(AcademicPeriodService);

  /**
   * Initializes the component with default values and creates a new data source
   */
  constructor() {
    this.editMode = false;
    this.enrollmentData = new Enrollment({});
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
   * Loads the initial enrollment data.
   */
  ngOnInit(): void {
    this.getAllEnrollments();
    this.loadStudents();
    this.loadPeriods();
  }

  getEnrollmentStatusLabel(status: string): string {
    const statusMap: { [key: string]: string } = {
      'ACTIVE': 'enrollment.status.active',
      'CANCELLED': 'enrollment.status.cancelled',
      'COMPLETED': 'enrollment.status.completed'
    };
    return statusMap[status] || status;
  }

  getPaymentStatusLabel(status: string): string {
    const statusMap: { [key: string]: string } = {
      'PENDING': 'enrollment.payment.pending',
      'PAID': 'enrollment.payment.paid',
      'REFUNDED': 'enrollment.payment.refunded'
    };
    return statusMap[status] || status;
  }

  /**
   * Handles the edit action for an enrollment
   * @param item - The enrollment to be edited
   */
  protected onEditItem(item: any) {
    this.editMode = true;
    this.enrollmentData = item;
  }

  /**
   * Handles the delete action for an enrollment
   * @param item - The enrollment to be deleted
   */
  protected onDeleteItem(item: Enrollment) {
    this.deleteEnrollment(item.id);
  }

  /**
   * Handles the cancellation of create/edit operations.
   * Resets the component state and refreshes the enrollment list.
   */
  protected onCancelRequested() {
    this.resetEditEnrollmentState();
    this.getAllEnrollments();
  }

  /**
   * Handles the addition of a new enrollment
   * @param item - The new enrollment to be added
   */
  protected onEnrollmentAddRequested(item: Enrollment) {
    this.enrollmentData = item;
    this.createEnrollment();
    this.resetEditEnrollmentState();
  }

  /**
   * Handles the update of an existing enrollment
   * @param item - The enrollment with updated information
   */
  protected onEnrollmentUpdateRequested(item: Enrollment) {
    this.enrollmentData = item;
    this.updateEnrollment();
    this.resetEditEnrollmentState();
  }

  /**
   * Resets the component's edit state to its default values.
   * Clears the current enrollment data and exits edit mode.
   */
  private resetEditEnrollmentState(): void {
    this.enrollmentData = new Enrollment({})
    this.editMode = false;
  }

  /**
   * Retrieves all enrollments from the service and updates the table's data source.
   * Uses EnrollmentService to fetch the data via HTTP.
   */
  private getAllEnrollments() {
    this.enrollmentService.getAll()
      .subscribe((response: Enrollment[]) => {
        this.dataSource.data = response
          .filter(e => e.studentId  > 0 && e.academicPeriodId  > 0);
      });
  }

  private loadStudents(): void {
    this.studentService.getAll().subscribe(students => {
      this.studentMap = new Map(students.map(s => [s.id, `${s.firstName} ${s.lastName}`]));
    });
  }

  private loadPeriods(): void {
    this.academicPeriodService.getAll().subscribe(periods => {
      this.periodMap = new Map(periods.map(p => [p.id, p.periodName]));
    });
  }

  /**
   * Creates a new enrollment using the EnrollmentService.
   * Updates the table's data source with the newly created enrollment.
   */
  private createEnrollment() {
    this.enrollmentService.create(this.enrollmentData).subscribe((response: Enrollment) => {
      this.dataSource.data = [...this.dataSource.data, response];
    });
  }

  /**
   * Updates an existing enrollment using the EnrollmentService.
   * Updates the corresponding enrollment in the table's data source.
   */
  private updateEnrollment() {
    const index = this.dataSource.data.findIndex(e => e.id === this.enrollmentData.id);
    const updated = [...this.dataSource.data];
    updated[index] = this.enrollmentData;
    this.dataSource.data = updated;
  }
  /**
   * Deletes an enrollment using the EnrollmentService.
   * Removes the enrollment from the table's data source.
   * @param id - The ID part of the enrollment to be deleted
   */
  private deleteEnrollment(id: number) {
    this.enrollmentService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(item => item.id !== id);
    });
  }
  //#endregion
}
