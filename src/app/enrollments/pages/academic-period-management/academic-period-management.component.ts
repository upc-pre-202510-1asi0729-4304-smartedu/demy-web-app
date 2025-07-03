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
import { DatePipe, NgClass } from "@angular/common";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AcademicPeriodCreateFormComponent } from '../../components/academic-period-create-and-edit/academic-period-create-and-edit.component';
import { AcademicPeriod } from '../../model/academic-period.entity';
import { AcademicPeriodService } from '../../services/academic-period.service';
import { TranslatePipe } from "@ngx-translate/core";

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
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    DatePipe,
    TranslatePipe
  ],
  templateUrl: 'academic-period-management.component.html',
  styleUrl: './academic-period-management.component.css'
})
export class AcademicPeriodManagementComponent implements OnInit, AfterViewInit {

  //#region Attributes

  /** The currently selected or edited academic period. */
  protected academicPeriodData!: AcademicPeriod;

  /** Columns to display in the Material table. */
  protected columnsToDisplay: string[] = ['name', 'start_date', 'end_date', 'actions'];

  /** Paginator reference for Material table. */
  @ViewChild(MatPaginator, { static: false })
  protected paginator!: MatPaginator;

  /** Sort header reference for Material table. */
  @ViewChild(MatSort)
  protected sort!: MatSort;

  /** Flag indicating whether the form is in edit mode. */
  protected editMode: boolean = false;

  /** Material data source for binding academic period data to the table. */
  protected dataSource!: MatTableDataSource<AcademicPeriod>;

  /** Injected service for API interaction regarding academic periods. */
  private academicPeriodService: AcademicPeriodService = inject(AcademicPeriodService);

  //#endregion

  //#region Lifecycle

  /**
   * Component constructor. Initializes data source and default form state.
   */
  constructor() {
    this.editMode = false;
    this.academicPeriodData = new AcademicPeriod({});
    this.dataSource = new MatTableDataSource();
  }

  /**
   * AfterViewInit lifecycle hook.
   * Assigns paginator and sort controls to the data source.
   */
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * OnInit lifecycle hook.
   * Fetches initial data from the API.
   */
  ngOnInit(): void {
    this.getAllAcademicPeriods();
  }

  //#endregion

  //#region Event Handlers

  /**
   * Handles the edit action.
   * @param item Academic period to edit.
   */
  protected onEditItem(item: AcademicPeriod): void {
    this.editMode = true;
    this.academicPeriodData = item;
  }

  /**
   * Handles the delete action.
   * @param item Academic period to delete.
   */
  protected onDeleteItem(item: AcademicPeriod): void {
    this.deleteAcademicPeriod(item.id);
  }

  /**
   * Cancels editing or creation.
   * Resets the form state and reloads academic periods.
   */
  protected onCancelRequested(): void {
    this.resetEditAcademicPeriodState();
    this.getAllAcademicPeriods();
  }

  /**
   * Handles the add action.
   * @param item New academic period to add.
   */
  protected onAcademicPeriodAddRequested(item: AcademicPeriod): void {
    this.academicPeriodData = item;
    this.createAcademicPeriod();
    this.resetEditAcademicPeriodState();
  }

  /**
   * Handles the update action.
   * @param item Updated academic period data.
   */
  protected onAcademicPeriodUpdateRequested(item: AcademicPeriod): void {
    this.academicPeriodData = item;
    this.updateAcademicPeriod();
    this.resetEditAcademicPeriodState();
  }

  //#endregion

  //#region Private Methods

  /**
   * Resets edit state and clears current academic period.
   */
  private resetEditAcademicPeriodState(): void {
    this.academicPeriodData = new AcademicPeriod({});
    this.editMode = false;
  }

  /**
   * Fetches all academic periods from the API.
   * Populates the table with data.
   */
  private getAllAcademicPeriods(): void {
    this.academicPeriodService.getAll().subscribe((response: AcademicPeriod[]) => {
      this.dataSource.data = response;
    });
  }

  /**
   * Creates a new academic period via the API.
   * Adds it to the data table.
   */
  private createAcademicPeriod(): void {
    this.academicPeriodService.create(this.academicPeriodData).subscribe((response: AcademicPeriod) => {
      this.dataSource.data = [...this.dataSource.data, response];
    });
  }

  /**
   * Updates an academic period via the API.
   * Replaces the old record in the data table.
   */
  private updateAcademicPeriod(): void {
    const periodToUpdate = this.academicPeriodData;
    this.academicPeriodService.update(periodToUpdate.id, periodToUpdate).subscribe((response: AcademicPeriod) => {
      const index = this.dataSource.data.findIndex(period => period.id === response.id);
      const data = [...this.dataSource.data];
      data[index] = response;
      this.dataSource.data = data;
    });
  }

  /**
   * Deletes an academic period via the API.
   * Removes it from the data table.
   * @param id ID of the academic period to delete.
   */
  private deleteAcademicPeriod(id: string): void {
    this.academicPeriodService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(period => period.id !== id);
    });
  }

  //#endregion
}
