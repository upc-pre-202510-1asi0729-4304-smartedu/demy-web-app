import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {Classroom} from "../../model/classroom.entity";
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
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {ClassroomService} from "../../services/classroom.service";
import {MatIcon} from "@angular/material/icon";
import {NgClass} from "@angular/common";
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {ClassroomModalComponent} from '../../components/classroom-modal/classroom-modal.component';
import {TranslatePipe} from '@ngx-translate/core';

/**
 * Component for displaying and managing a list of classrooms.
 * Allows viewing, adding, editing, and deleting classrooms in the system.
 */
@Component({
  selector: 'app-classroom-overview',
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
  templateUrl: './classroom-overview.component.html',
  styleUrls: ['./classroom-overview.component.css']
})
export class ClassroomOverviewComponent implements OnInit, AfterViewInit {

  //#region Attributes

  /** Holds the classroom data currently being managed */
  protected classroomData!: Classroom;

  /** List of columns to display in the table */
  protected columnsToDisplay: string[] = ['code', 'capacity', 'campus', 'actions'];

  /** Reference to the paginator for paginating the table */
  @ViewChild(MatPaginator, { static: false })
  protected paginator!: MatPaginator;

  /** Reference to the sort functionality for the table */
  @ViewChild(MatSort)
  protected sort!: MatSort;

  /** Data source for the classroom table */
  protected dataSource!: MatTableDataSource<any>;

  /** Service for managing classroom data */
  private classroomService: ClassroomService = inject(ClassroomService);

  /** Dialog service for opening dialogs */
  private dialog = inject(MatDialog);

  /** The current classroom object being edited or added */
  protected classroom: Classroom = new Classroom({});

  //#endregion Attributes

  /**
   * Initializes the component and loads all classrooms
   */
  constructor() {
    this.classroomData = new Classroom({});
    this.dataSource = new MatTableDataSource();
    console.log(this.classroomData);
  }

  /**
   * Runs after the view is initialized to set up pagination and sorting
   */
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Initializes the component by loading all classrooms from the service
   */
  ngOnInit(): void {
    this.getAllClassrooms();
  }

  /**
   * Opens a dialog to add a new classroom
   */
  protected onNewClassroom(): void {
    const dialogRef = this.dialog.open(ClassroomModalComponent, {
      data: {
        mode: 'add',
        classroom: new Classroom({})
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.classroomService.create(result).subscribe((response: Classroom) => {
          this.getAllClassrooms(); // Refresh the list
        });
      }
    });
  }

  /**
   * Opens a dialog to edit an existing classroom
   * @param item - The classroom to edit
   */
  protected onEditItem(item: Classroom): void {
    const dialogRef = this.dialog.open(ClassroomModalComponent, {
      data: {
        mode: 'edit',
        classroom: { ...item } // Create a copy to avoid modifying the original until submission
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.classroomService.update(result.id, result).subscribe(() => {
          this.getAllClassrooms(); // Refresh the list
        });
      }
    });
  }

  /**
   * Opens a dialog to confirm the deletion of a classroom
   * @param item - The classroom to delete
   */
  protected onDeleteItem(item: Classroom): void {
    const dialogRef = this.dialog.open(ClassroomModalComponent, {
      data: {
        mode: 'delete',
        classroom: item
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteCourse(item.id);
      }
    });
  }


  /**
   * Fetches all classrooms from the service and updates the table data
   */
  private getAllClassrooms() {
    this.classroomService.getAll().subscribe((response: Array<Classroom>) => {
      this.dataSource.data = response;
    });
  }

  /**
   * Creates a new classroom using the current classroom data and adds it to the table
   */
  private createClassroom() {
    this.classroomService.create(this.classroomData).subscribe((response: Classroom) => {
      this.dataSource.data.push(response);
      this.dataSource.data = this.dataSource.data;
    });
  }

  /**
   * Updates an existing classroom using the current classroom data
   */
  private updateClassroom() {
    let classroomToUpdate = this.classroomData;
    this.classroomService.update(classroomToUpdate.id, classroomToUpdate).subscribe((response: Classroom) => {
      let index = this.dataSource.data.findIndex((classroom: Classroom) => classroom.id === response.id);
      this.dataSource.data[index] = response;
      this.dataSource.data = this.dataSource.data;
    });
  }

  /**
   * Deletes a classroom using the ClassroomService.
   * Removes the classroom from the table's data source.
   * @param id - The ID of the classroom to delete
   */
  private deleteCourse(id: number) {
    this.classroomService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((classroom: Classroom) => classroom.id !== id);
    });
  }

}
