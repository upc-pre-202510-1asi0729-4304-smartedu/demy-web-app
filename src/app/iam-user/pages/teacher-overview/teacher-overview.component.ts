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
 * Component that displays a list of teachers in a Material table with sorting, pagination, and actions.
 *
 * @summary
 * Provides functionality to add, edit, and delete teacher accounts through a modal dialog.
 * Data is retrieved from the backend using the {@link TeacherService}.
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
   * The columns displayed in the teacher table.
   */
  protected columnsToDisplay: string[] = ['fullName', 'email', 'actions'];

  /**
   * Data source for the Material table containing teacher accounts.
   */
  protected dataSource = new MatTableDataSource<UserAccount>();

  /**
   * Paginator instance for paginating the table.
   */
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /**
   * Sort instance for sorting the table.
   */
  @ViewChild(MatSort) sort!: MatSort;

  /** Injected service for managing teacher data. */
  private teacherService = inject(TeacherService);
  /** Injected service for opening dialogs. */
  private dialog = inject(MatDialog);

  /**
   * Lifecycle hook that is called after component initialization.
   *
   * @summary
   * Loads all teachers from the backend.
   */
  ngOnInit(): void {
    this.getAllTeachers();
  }

  /**
   * Lifecycle hook that is called after the view has been fully initialized.
   *
   * @summary
   * Binds the paginator and sorter to the Material data table.
   */
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Opens the modal dialog for creating a new teacher.
   *
   * @summary
   * If the creation is successful, reloads the teacher table.
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
   * Opens the modal dialog for editing a teacher.
   *
   * @summary
   * Pre-fills the dialog with the selected teacher's data. Reloads the table on successful update.
   *
   * @param teacher - The {@link UserAccount} object representing the teacher to edit
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
   * Opens the modal dialog for deleting a teacher.
   *
   * @summary
   * Prompts the user for confirmation. If confirmed, deletes the teacher and updates the table.
   *
   * @param teacher - The {@link UserAccount} object representing the teacher to delete
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
   * Fetches all teachers from the backend.
   *
   * @summary
   * Calls {@link TeacherService.getTeachers} and filters by role `TEACHER`.
   * Updates the table data source.
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
