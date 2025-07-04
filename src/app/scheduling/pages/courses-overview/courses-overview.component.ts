import {Component, inject, ViewChild} from '@angular/core';
import {Course} from "../../model/course.entity";
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
import {CourseService} from "../../services/course.service";
import {MatIcon} from "@angular/material/icon";
import {NgClass} from "@angular/common";
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {CourseModalComponent} from '../../components/course-modal/course-modal.component';
import {TranslatePipe} from '@ngx-translate/core';

/**
 * Component for displaying and managing a list of courses.
 * Allows viewing, adding, editing, and deleting courses in the system.
 */
@Component({
  selector: 'app-courses-overview',
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
  templateUrl: './courses-overview.component.html',
  styleUrls: ['./courses-overview.component.css']
})
export class CoursesOverviewComponent {

  //#region Attributes

  /** Current course being created or edited */
  protected courseData!: Course;

  /** Defines which columns should be displayed in the table and their order */
  protected columnsToDisplay: string[] = ['name', 'code', 'description', 'actions'];

  /** Reference to the Material paginator for handling page-based data display */
  @ViewChild(MatPaginator, { static: false })
  protected paginator!: MatPaginator;

  /** Reference to the Material sort directive for handling column sorting */
  @ViewChild(MatSort)
  protected sort!: MatSort;

  /** Material table data source for managing and displaying course data */
  protected dataSource!: MatTableDataSource<any>;

  /** Service for handling course-related API operations */
  private courseService: CourseService = inject(CourseService);

  /** Dialog service for opening dialogs */
  private dialog = inject(MatDialog);

  /** The current course object being edited or added */
  protected course: Course = new Course({});

  //#endregion

  //#region Methods

  /**
   * Initializes the component with default values and creates a new data source
   */
  constructor() {
    this.courseData = new Course({});
    this.dataSource = new MatTableDataSource();
    console.log(this.courseData);
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
   * Loads the initial course data.
   */
  ngOnInit(): void {
    this.getAllCourses();
  }

  /**
   * Opens a dialog to add a new course
   */
  protected onNewCourse(): void {
    const dialogRef = this.dialog.open(CourseModalComponent, {
      data: {
        mode: 'add',
        course: new Course({})
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.courseService.create(result).subscribe(() => {
          this.getAllCourses(); // Refresh the list
        });
      }
    });
  }

  /**
   * Handles the edit action for a course
   * @param item - The course to be edited
   */
  protected onEditItem(item: Course): void {
    const dialogRef = this.dialog.open(CourseModalComponent, {
      data: {
        mode: 'edit',
        course: { ...item } // Create a copy to avoid modifying the original until submission
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.courseService.update(result.id, result).subscribe(() => {
          this.getAllCourses(); // Refresh the list
        });
      }
    });
  }

  /**
   * Handles the delete action for a course
   * @param item - The course to be deleted
   */
  protected onDeleteItem(item: Course): void {
    const dialogRef = this.dialog.open(CourseModalComponent, {
      data: {
        mode: 'delete',
        course: item
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteCourse(item.id);
      }
    });
  }


  /**
   * Retrieves all courses from the service and updates the table's data source.
   * Uses CourseService to fetch the data via HTTP.
   */
  private getAllCourses() {
    this.courseService.getAll().subscribe((response: Array<Course>) => {
      this.dataSource.data = response;
    });
  }

  /**
   * Creates a new course using the CourseService.
   * Updates the table's data source with the newly created course.

  private createCourse() {
    this.courseService.create(this.courseData).subscribe((response: Course) => {
      this.dataSource.data.push(response);
      this.dataSource.data = this.dataSource.data;
    });
  }
   */


  /**
   * Updates an existing course using the CourseService.
   * Updates the corresponding course in the table's data source.

  private updateCourse() {
    let courseToUpdate = this.courseData;
    this.courseService.update(courseToUpdate.id, courseToUpdate).subscribe((response: Course) => {
      let index = this.dataSource.data.findIndex((course: Course) => course.id === response.id);
      this.dataSource.data[index] = response;
      this.dataSource.data = this.dataSource.data;
    });
  }
   */


  /**
   * Deletes a course using the CourseService.
   * Removes the course from the table's data source.
   * @param id - The ID of the course to delete
   */
  private deleteCourse(id: number) {
    this.courseService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((course: Course) => course.id !== id);
    });
  }

  //#endregion

}
