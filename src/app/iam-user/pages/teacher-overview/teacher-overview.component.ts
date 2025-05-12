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

  ngOnInit(): void {
    this.getAllTeachers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

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
