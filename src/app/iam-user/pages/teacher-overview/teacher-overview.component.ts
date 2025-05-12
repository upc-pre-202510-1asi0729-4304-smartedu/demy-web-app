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
 * Component that shows an overview of the teachers in a table.
 * Allows adding, editing, and deleting teachers through a modal.
 * The table includes pagination, sorting, and the ability to interact with teacher data.
 *
 * @remarks
 * This component uses the TeacherService to fetch and manage teacher data.
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
  protected columnsToDisplay: string[] = ['fullName', 'email', 'actions'];
  protected dataSource = new MatTableDataSource<UserAccount>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private teacherService = inject(TeacherService);
  private dialog = inject(MatDialog);

  /**
   * Method that runs when the component is initialized.
   * Responsible for loading the list of teachers.
   */
  ngOnInit(): void {
    this.getAllTeachers();
  }

  /**
   * Method that runs after the view has been fully initialized.
   * Sets up pagination and sorting for the table.
   */
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Opens the modal to add a new teacher.
   * When the modal is closed successfully, the new teacher is saved, and the list is updated.
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
   * Opens the modal to edit an existing teacher.
   * When the modal is closed successfully, the teacher is updated, and the list is refreshed.
   *
   * @param teacher - The teacher to edit
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
   * Opens the modal to confirm the deletion of a teacher.
   * If the deletion is confirmed, the teacher is deleted, and the list is updated.
   *
   * @param teacher - The teacher to delete
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
   * Filters the teachers based on their role to only show those with the role 'TEACHER'.
   */
  private getAllTeachers() {
    this.teacherService.getTeachers().subscribe({
      next: (teachers: any[]) => {

        const profesores = [];
        for (let i = 0; i < teachers.length; i++) {
          if (teachers[i].role === 1 || teachers[i].role === 'TEACHER') {
            profesores.push(teachers[i]);
          }
        }
        this.dataSource.data = profesores;
        console.log("Datos cargados:", profesores);
      },
      error: (err) => console.error("Error cargando datos:", err)
    });
  }
}
