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
import { NgClass } from "@angular/common";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {
  AcademicPeriodCreateFormComponent
} from '../../components/academic-period-create-and-edit/academic-period-create-and-edit.component';
import {AcademicPeriod} from '../../model/academic-period.entity';
import { AcademicPeriodService } from '../../services/academic-period.service';

/**
 * Component responsible for managing academic periods through a table interface.
 * Provides functionality for viewing, creating, updating, and deleting academic periods.
 * Features include pagination, sorting, and integrated CRUD operations.
 */
@Component({
  selector: 'app-academic-period-management',
  standalone: true,
  imports: [
    AcademicPeriodCreateFormComponent,
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
    AcademicPeriodCreateFormComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: 'academic-period-management.component.html',
  styleUrl: './academic-period-management.component.css'
})
export class AcademicPeriodManagementComponent implements OnInit, AfterViewInit {

  //#region Attributes

  /** Current academic period being created or edited */
  protected academicPeriodData!: AcademicPeriod;

  /** Defines which columns should be displayed in the table and their order */
  protected columnsToDisplay: string[] = ['name', 'academy_id', 'start_date', 'end_date', 'actions'];

  /** Reference to the Material paginator for handling page-based data display */
  @ViewChild(MatPaginator, { static: false })
  protected paginator!: MatPaginator;

  /** Reference to the Material sort directive for handling column sorting */
  @ViewChild(MatSort)
  protected sort!: MatSort;

  /** Controls whether the component is in edit mode */
  protected editMode: boolean = false;

  /** Material table data source for managing and displaying academic period data */
  protected dataSource!: MatTableDataSource<any>;

  /** Service for handling academic period-related API operations */
  private academicPeriodService: AcademicPeriodService = inject(AcademicPeriodService);
  //#endregion

  //#region Methods

  /**
   * Initializes the component with default values and creates a new data source
   */
  constructor() {
    this.editMode = false;
    this.academicPeriodData = new AcademicPeriod({})
    this.dataSource = new MatTableDataSource();
    console.log(this.academicPeriodData);
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
   * Loads the initial academic period data.
   */
  ngOnInit(): void {
    this.getAllAcademicPeriods();
  }

  /**
   * Handles the edit action for an academic period
   * @param item - The academic period to be edited
   */
  protected onEditItem(item: AcademicPeriod) {
    this.editMode = true;
    this.academicPeriodData = item
  }

  /**
   * Handles the delete action for an academic period
   * @param item - The academic period to be deleted
   */
  protected onDeleteItem(item: AcademicPeriod) {
    this.deleteAcademicPeriod(item.id);
  }

  /**
   * Handles the cancellation of create/edit operations.
   * Resets the component state and refreshes the academic period list.
   */
  protected onCancelRequested() {
    this.resetEditAcademicPeriodState();
    this.getAllAcademicPeriods();
  }

  /**
   * Handles the addition of a new academic period
   * @param item - The new academic period to be added
   */
  protected onAcademicPeriodAddRequested(item: AcademicPeriod) {
    this.academicPeriodData = item;
    this.createAcademicPeriod();
    this.resetEditAcademicPeriodState();
  }

  /**
   * Handles the update of an existing academic period
   * @param item - The academic period with updated information
   */
  protected onAcademicPeriodUpdateRequested(item: AcademicPeriod) {
    this.academicPeriodData = item;
    this.updateAcademicPeriod();
    this.resetEditAcademicPeriodState();
  }

  /**
   * Resets the component's edit state to its default values.
   * Clears the current academic period data and exits edit mode.
   */
  private resetEditAcademicPeriodState(): void {
    this.academicPeriodData = new AcademicPeriod({});
    this.editMode = false;
  }

  /**
   * Retrieves all academic periods from the service and updates the table's data source.
   * Uses AcademicPeriodService to fetch the data via HTTP.
   */
  private getAllAcademicPeriods() {
    this.academicPeriodService.getAll().subscribe((response: Array<AcademicPeriod>) => {
      this.dataSource.data = response;
    });
  }

  /**
   * Creates a new academic period using the AcademicPeriodService.
   * Updates the table's data source with the newly created academic period.
   */
  private createAcademicPeriod() {
    this.academicPeriodService.create(this.academicPeriodData).subscribe((response: AcademicPeriod) => {
      this.dataSource.data.push(response);
      this.dataSource.data = this.dataSource.data;
    });
  }

  /**
   * Updates an existing academic period using the AcademicPeriodService.
   * Updates the corresponding academic period in the table's data source.
   */
  private updateAcademicPeriod() {
    let periodToUpdate = this.academicPeriodData;
    this.academicPeriodService.update(periodToUpdate.name, periodToUpdate).subscribe((response: AcademicPeriod) => {
      let index = this.dataSource.data.findIndex((period:AcademicPeriod ) => period.id === response.id);
      this.dataSource.data[index] = response;
      this.dataSource.data = this.dataSource.data;
    });
  }

  /**
   * Deletes an academic period using the AcademicPeriodService.
   * Removes the academic period from the table's data source.
   * @param id - The (ID) of the academic period to delete
   */
  private deleteAcademicPeriod(id: string) {
    this.academicPeriodService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((period: AcademicPeriod) => period.id !== id);
    });
  }

  //#endregion
}
