import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TeacherScheduleSearchComponent } from '../../components/teacher-schedule-search/teacher-schedule-search.component';

/**
 * Component for teacher schedule page.
 * Displays the current teacher's schedule.
 */
@Component({
  selector: 'app-teacher-schedule',
  standalone: true,
  imports: [
    CommonModule,
    TranslatePipe,
    MatCardModule,
    MatIconModule,
    TeacherScheduleSearchComponent
  ],
  templateUrl: './teacher-schedule.component.html',
  styleUrls: ['./teacher-schedule.component.css']
})
export class TeacherScheduleComponent {
  errorMessage: string | null = null;

  constructor() {}
}
