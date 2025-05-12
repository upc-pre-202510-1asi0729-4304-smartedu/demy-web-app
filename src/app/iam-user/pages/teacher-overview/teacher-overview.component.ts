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
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { TeacherModalComponent } from '../../components/teacher-modal/teacher-modal.component';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { UserAccount } from '../../model/user.entity';
import { TeacherService } from '../../services/teacher.service';
import { Role } from '../../model/role.model';

@Component({
  selector: 'app-teacher-overview',
  standalone: true,
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
  templateUrl: './teacher-overview.component.html',
  styleUrls: ['./teacher-overview.component.css']
})
export class TeacherOverviewComponent implements OnInit, AfterViewInit {
  protected teacherData!: UserAccount;
  protected columnsToDisplay: string[] = ['fullName', 'email', 'specialty', 'actions'];

  @ViewChild(MatPaginator, {static: false}) protected paginator!: MatPaginator;
  @ViewChild(MatSort) protected sort!: MatSort;
  protected dataSource!: MatTableDataSource<any>;

  private teacherService: TeacherService = inject(TeacherService);
  private dialog = inject(MatDialog);
  protected teacher: UserAccount = new UserAccount({ role: Role.TEACHER });

  constructor() {
    this.teacherData = new UserAccount({ role: Role.TEACHER });
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllTeachers();
  }

  protected onNewTeacher(): void {
    const dialogRef = this.dialog.open(TeacherModalComponent, {
      data: {
        mode: 'add',
        teacher: new UserAccount({ role: Role.TEACHER })
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.teacherService.create(result).subscribe((response: UserAccount) => {
          this.getAllTeachers();
        });
      }
    });
  }

  protected onEditItem(item: UserAccount): void {
    const dialogRef = this.dialog.open(TeacherModalComponent, {
      data: {
        mode: 'edit',
        teacher: {...item}
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.teacherService.update(result.id, result).subscribe(() => {
          this.getAllTeachers();
        });
      }
    });
  }

  protected onDeleteItem(item: UserAccount): void {
    const dialogRef = this.dialog.open(TeacherModalComponent, {
      data: {
        mode: 'delete',
        teacher: item
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteTeacher(item.id);
      }
    });
  }

  private getAllTeachers() {
    this.teacherService.getTeachers().subscribe((response: Array<UserAccount>) => {
      this.dataSource.data = response;
    });
  }

  private deleteTeacher(id: number) {
    this.teacherService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((teacher: UserAccount) => teacher.id !== id);
    });
  }
}
