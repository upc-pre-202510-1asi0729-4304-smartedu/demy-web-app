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
import {TranslateModule, TranslatePipe} from '@ngx-translate/core';


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
  styleUrl: './classroom-overview.component.css'
})
export class ClassroomOverviewComponent implements OnInit, AfterViewInit {

  //#region Attributes

  protected classroomData!: Classroom;

  protected columnsToDisplay: string[] = ['code', 'capacity', 'campus', 'actions'];

 @ViewChild(MatPaginator, {static: false})
  protected paginator!: MatPaginator;

  @ViewChild(MatSort)
  protected sort!: MatSort;


  protected dataSource!: MatTableDataSource<any>;

  private classroomService: ClassroomService = inject(ClassroomService);


  //NUEVOOOO
  /** Dialog service for opening dialogs */
  private dialog = inject(MatDialog);

  /** Current course for operations */
  protected classroom: Classroom = new Classroom({});



  constructor() {
    this.classroomData = new Classroom({});
    this.dataSource = new MatTableDataSource();
    console.log(this.classroomData);
  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  ngOnInit(): void {
    this.getAllClassrooms();
  }

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


  protected onEditItem(item: Classroom): void {
    const dialogRef = this.dialog.open(ClassroomModalComponent, {
      data: {
        mode: 'edit',
        classroom: {...item} // Create a copy to avoid modifying the original until submission
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


  private resetEditState(): void {
    this.classroomData = new Classroom({});
  }


  private getAllClassrooms() {
    this.classroomService.getAll().subscribe((response: Array<Classroom>) => {
      this.dataSource.data = response;
    });
  }

  private createClassroom() {
    this.classroomService.create(this.classroomData).subscribe((response: Classroom) => {
      this.dataSource.data.push(response);
      this.dataSource.data = this.dataSource.data;
    });
  }

  private updateClassroom() {
    let classroomToUpdate = this.classroomData;
    this.classroomService.update(classroomToUpdate.id, classroomToUpdate).subscribe((response: Classroom) => {
      let index = this.dataSource.data.findIndex((classroom: Classroom) => classroom.id === response.id);
      this.dataSource.data[index] = response;
      this.dataSource.data = this.dataSource.data;
    });
  }

  /**
   * Deletes a course using the CourseService.
   * Removes the course from the table's data source.
   * @param id - The ID of the course to delete
   */
  private deleteCourse(id: number) {
    this.classroomService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((classroom: Classroom) => classroom.id !== id);
    });
  }

}
