import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TeacherScheduleSearchComponent } from '../../components/teacher-schedule-search/teacher-schedule-search.component';

/**
 * Component for teacher schedule page.
 * Displays the current teacher's schedule.
 */
@Component({
  selector: 'app-teacher-schedule',
  standalone: true,
  imports: [
    TranslatePipe,
    TeacherScheduleSearchComponent
  ],
  templateUrl: './teacher-schedule.component.html',
  styleUrls: ['./teacher-schedule.component.css']
})
export class TeacherScheduleComponent {}
