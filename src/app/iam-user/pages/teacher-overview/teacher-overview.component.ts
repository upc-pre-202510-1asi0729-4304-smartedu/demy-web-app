import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { TeacherModalComponent } from '../../components/teacher-modal/teacher-modal.component';
import { UserAccount } from '../../model/user.entity';
import { TeacherService } from '../../services/teacher.service';
import { TranslateModule } from '@ngx-translate/core';
import {MatTooltipModule} from '@angular/material/tooltip';


/**
 * Component that displays a list of teachers in a table with sorting and pagination.
 *
 * Provides actions to add, edit, or delete teachers using a modal dialog.
 * Fetches data from the backend using the {@link TeacherService}.
 */
@Component({
  selector: 'app-teacher-overview',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule,
    MatTooltipModule
  ],
  templateUrl: './teacher-overview.component.html',
  styleUrls: ['./teacher-overview.component.css']
})
export class TeacherOverviewComponent implements OnInit, AfterViewInit {
  /**
   * Columns displayed in the teacher table.
   */
  protected columnsToDisplay: string[] = ['fullName', 'email', 'actions'];

  /**
   * Data source for the Angular Material table.
   */
  protected dataSource = new MatTableDataSource<UserAccount>();

  /**
   * Reference to the table paginator.
   */
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /**
   * Reference to the table sorter.
   */
  @ViewChild(MatSort) sort!: MatSort;

  private teacherService = inject(TeacherService);
  private dialog = inject(MatDialog);

  /**
   * Lifecycle hook that runs on component initialization.
   * Loads the list of teachers from the backend.
   */
  ngOnInit(): void {
    this.getAllTeachers();
  }

  /**
   * Lifecycle hook that runs after the view is fully initialized.
   * Assigns the paginator and sorter to the data table.
   */
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Opens the teacher modal in 'add' mode.
   * If a new teacher is successfully added, the table is refreshed.
   */
  onNewTeacher(): void {
    const dialogRef = this.dialog.open(TeacherModalComponent, {
      width: '500px',
      data: { mode: 'add' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.teacherService.createTeacher(result).subscribe({
          next: () => this.getAllTeachers(),
          error: (err) => console.error('Error creating teacher:', err)
        });
      }
    });
  }

  /**
   * Opens the teacher modal in 'edit' mode with pre-filled teacher data.
   * If edited successfully, the table is refreshed.
   *
   * @param teacher - The teacher to be edited.
   */
  protected onEditItem(teacher: UserAccount): void {
    const dialogRef = this.dialog.open(TeacherModalComponent, {
      data: {
        mode: 'edit',
        teacher: { ...teacher }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.teacherService.updateTeacher(result.id, result).subscribe({
          next: () => this.getAllTeachers(),
          error: (err) => console.error('Error updating teacher:', err)
        });
      }
    });
  }

  /**
   * Opens the teacher modal in 'delete' mode to confirm deletion.
   * If confirmed, deletes the teacher and updates the table.
   *
   * @param teacher - The teacher to be deleted.
   */
  protected onDeleteItem(teacher: UserAccount): void {
    const dialogRef = this.dialog.open(TeacherModalComponent, {
      data: {
        mode: 'delete',
        teacher: teacher
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.teacherService.deleteTeacher(teacher.id).subscribe({
          next: () => {
            this.dataSource.data = this.dataSource.data.filter(t => t.id !== teacher.id);
          },
          error: (err) => console.error('Error deleting teacher:', err)
        });
      }
    });
  }

  /**
   * Fetches all teacher accounts from the backend and filters those with role `TEACHER`.
   * Updates the data source with the filtered list.
   */
  private getAllTeachers() {
    this.teacherService.getTeachers().subscribe({
      next: (teachers: any[]) => {
        const profesores = teachers.filter(t => t.role === 'TEACHER');
        this.dataSource.data = profesores;
        console.log("Datos cargados:", profesores);
      },
      error: (err) => console.error("Error cargando datos:", err)
    });
  }



}
