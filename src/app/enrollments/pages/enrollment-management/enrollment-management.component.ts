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
import { NgClass } from "@angular/common";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  EnrollmentsCreateFormComponent
} from '../../components/enrollments-create-and-edit/enrollments-create-and-edit.component';
import { EnrollmentService } from '../../services/enrollment.service';
import {EnrollmentRegistrationResource} from '../../services/enrollment.response';
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
    MatInputModule
  ],
  templateUrl: 'enrollment-management.component.html',
  styleUrl: 'enrollment-management.component.css'
})
export class EnrollmentsManagementComponent implements OnInit, AfterViewInit {

  //#region Attributes

  /** Current enrollment being created or edited */
  protected enrollmentRegistration: EnrollmentRegistrationResource;

  /** Defines which columns should be displayed in the table and their order */
  protected columnsToDisplay: string[] = ['student_id', 'period_id', 'enrollment_date', 'amount', 'status', 'payment_status', 'actions'];

  /** Reference to the Material paginator for handling page-based data display */
  @ViewChild(MatPaginator, { static: false })
  protected paginator!: MatPaginator;

  /** Reference to the Material sort directive for handling column sorting */
  @ViewChild(MatSort)
  protected sort!: MatSort;

  /** Controls whether the component is in edit mode */
  protected editMode: boolean = false;

  /** Material table data source for managing and displaying enrollment data */
  protected dataSource: MatTableDataSource<EnrollmentRegistrationResource>;

  /** Service for handling enrollment-related API operations */
  private enrollmentService: EnrollmentService = inject(EnrollmentService);
  //#endregion

  //#region Methods

  /**
   * Initializes the component with default values and creates a new data source
   */
  constructor() {
    this.editMode = false;
    this.enrollmentRegistration = {

      student_id: '',
      period_id: '',
      enrollment_date: '',
      amount: 0,
      status: 'ACTIVE',
      payment_status: 'UNPAID',
      date_created: ''
    };
    this.dataSource = new MatTableDataSource<EnrollmentRegistrationResource>([]);
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
  }

  /**
   * Handles the edit action for an enrollment
   * @param item - The enrollment to be edited
   */
  protected onEditItem(item: EnrollmentRegistrationResource) {
    this.editMode = true;
    this.enrollmentRegistration = {...item};
  }

  /**
   * Handles the delete action for an enrollment
   * @param item - The enrollment to be deleted
   */
  protected onDeleteItem(item: EnrollmentRegistrationResource) {
    this.deleteEnrollment(item.student_id, item.period_id);
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
  protected onEnrollmentAddRequested(item: EnrollmentRegistrationResource) {
    this.enrollmentRegistration = item;
    this.createEnrollment();
    this.resetEditEnrollmentState();
  }

  /**
   * Handles the update of an existing enrollment
   * @param item - The enrollment with updated information
   */
  protected onEnrollmentUpdateRequested(item: EnrollmentRegistrationResource) {
    this.enrollmentRegistration = item;
    this.updateEnrollment();
    this.resetEditEnrollmentState();
  }

  /**
   * Resets the component's edit state to its default values.
   * Clears the current enrollment data and exits edit mode.
   */
  private resetEditEnrollmentState(): void {
    this.enrollmentRegistration = {
      student_id: '',
      period_id: '',
      enrollment_date: '',
      amount: 0,
      status: 'ACTIVE',
      payment_status: 'UNPAID',
      date_created: ''
    };
    this.editMode = false;
  }

  /**
   * Retrieves all enrollments from the service and updates the table's data source.
   * Uses EnrollmentService to fetch the data via HTTP.
   */
  private getAllEnrollments() {
    this.enrollmentService.getAll().subscribe((response: Array<EnrollmentRegistrationResource>) => {
      this.dataSource.data = response;
    });
  }

  /**
   * Creates a new enrollment using the EnrollmentService.
   * Updates the table's data source with the newly created enrollment.
   */
  private createEnrollment() {
    this.enrollmentService.create(this.enrollmentRegistration).subscribe((response: EnrollmentRegistrationResource) => {
      this.dataSource.data = [...this.dataSource.data, response];
    });
  }

  /**
   * Updates an existing enrollment using the EnrollmentService.
   * Updates the corresponding enrollment in the table's data source.
   */
  private updateEnrollment() {
    let enrollmentToUpdate = this.enrollmentRegistration;
    this.enrollmentService.update(enrollmentToUpdate.student_id, enrollmentToUpdate).subscribe(
      (response: EnrollmentRegistrationResource) => {
        const index = this.dataSource.data.findIndex(
          (enrollment: EnrollmentRegistrationResource) =>
            enrollment.student_id === response.student_id &&
            enrollment.period_id === response.period_id
        );

        if (index !== -1) {
          const updatedData = [...this.dataSource.data];
          updatedData[index] = response;
          this.dataSource.data = updatedData;
        }
      }
    );
  }

  /**
   * Deletes an enrollment using the EnrollmentService.
   * Removes the enrollment from the table's data source.
   * @param studentId - The student ID part of the composite key
   * @param periodId - The period ID part of the composite key
   */
  private deleteEnrollment(studentId: string, periodId: string) {
    this.enrollmentService.delete(studentId).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (enrollment: EnrollmentRegistrationResource) =>
          enrollment.student_id !== studentId ||
          enrollment.period_id !== periodId
      );
    });
  }

  //#endregion
}
