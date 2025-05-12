import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { ScheduleWeekly } from "../../model/weekly-schedule.entity";
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
import { WeeklyScheduleService } from "../../services/weekly-schedule.service";
import { MatIcon } from "@angular/material/icon";
import { NgClass } from "@angular/common";
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { WeeklyScheduleModalComponent } from '../../components/weekly-schedule-modal/weekly-schedule-modal.component';
import { TranslatePipe } from '@ngx-translate/core';


/**
 * Component for displaying and managing weekly schedules.
 * Provides the ability to view, add, edit, and delete weekly schedules.
 */
@Component({
  selector: 'app-weekly-schedules-overview',
  imports: [
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
    MatIconButton,
    MatButton,
    TranslatePipe
  ],
  templateUrl: './weekly-schedules-overview.component.html',
  styleUrls: ['./weekly-schedules-overview.component.css']
})
export class WeeklySchedulesOverviewComponent implements OnInit, AfterViewInit {

  //#region Attributes

  /** Current weekly schedule being created or edited */
  protected weeklyScheduleData!: ScheduleWeekly;

  /** Defines which columns should be displayed in the table and their order */
  protected columnsToDisplay: string[] = ['name', 'schedulesCount', 'actions'];

  /** Reference to the Material paginator for handling page-based data display */
  @ViewChild(MatPaginator, { static: false })
  protected paginator!: MatPaginator;

  /** Reference to the Material sort directive for handling column sorting */
  @ViewChild(MatSort)
  protected sort!: MatSort;

  /** Material table data source for managing and displaying weekly schedule data */
  protected dataSource!: MatTableDataSource<any>;

  /** Service for handling weekly schedule-related API operations */
  private weeklyScheduleService: WeeklyScheduleService = inject(WeeklyScheduleService);

  /** Dialog service for opening dialogs */
  private dialog = inject(MatDialog);

  /** Current weekly schedule for operations */
  protected weeklySchedule: ScheduleWeekly = new ScheduleWeekly({});

  //#endregion

  //#region Methods

  /**
   * Initializes the component with default values and creates a new data source
   */
  constructor() {
    this.weeklyScheduleData = new ScheduleWeekly({});
    this.dataSource = new MatTableDataSource<ScheduleWeekly>();
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
   * Loads the initial weekly schedule data.
   */
  ngOnInit(): void {
    this.getAllWeeklySchedules();
  }

  /**
   * Opens a dialog to add a new weekly schedule
   */
  protected onNewWeeklySchedule(): void {
    const dialogRef = this.dialog.open(WeeklyScheduleModalComponent, {
      data: {
        mode: 'add',
        weeklySchedule: new ScheduleWeekly({ weekSchedule: [] })
      },
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.weeklyScheduleService.create(result).subscribe((response: ScheduleWeekly) => {
          this.getAllWeeklySchedules(); // Refresh the list
        });
      }
    });
  }

  /**
   * Opens a dialog to edit an existing weekly schedule
   * @param item - The weekly schedule to be edited
   */
  protected onEditItem(item: ScheduleWeekly): void {
    const dialogRef = this.dialog.open(WeeklyScheduleModalComponent, {
      data: {
        mode: 'edit',
        weeklySchedule: { ...item } // Create a copy to avoid modifying the original until submission
      },
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.weeklyScheduleService.update(result.id, result).subscribe(() => {
          this.getAllWeeklySchedules(); // Refresh the list
        });
      }
    });
  }

  /**
   * Opens a dialog to confirm the deletion of a weekly schedule
   * @param item - The weekly schedule to be deleted
   */
  protected onDeleteItem(item: ScheduleWeekly): void {
    const dialogRef = this.dialog.open(WeeklyScheduleModalComponent, {
      data: {
        mode: 'delete',
        weeklySchedule: item
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteWeeklySchedule(item.id);
      }
    });
  }

  /**
   * Returns the count of schedules for the given weekly schedule
   * @param schedule - The weekly schedule to count the schedules for
   * @returns The number of schedules for the given weekly schedule
   */
  protected getSchedulesCount(schedule: ScheduleWeekly): number {
    return schedule.weekSchedule?.length || 0;
  }

  /**
   * Retrieves all weekly schedules from the service and updates the table's data source.
   * Uses WeeklyScheduleService to fetch the data via HTTP.
   */
  private getAllWeeklySchedules() {
    this.weeklyScheduleService.getAll().subscribe((response: Array<ScheduleWeekly>) => {
      this.dataSource.data = response;
    });
  }

  /**
   * Deletes a weekly schedule using the WeeklyScheduleService.
   * Removes the weekly schedule from the table's data source.
   * @param id - The ID of the weekly schedule to delete
   */
  private deleteWeeklySchedule(id: number) {
    this.weeklyScheduleService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((schedule: ScheduleWeekly) => schedule.id !== id);
    });
  }

  //#endregion
}
