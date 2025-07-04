import { Component } from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {WeeklyScheduleSearchComponent} from '../../components/weekly-schedule-search/weekly-schedule-search.component';

/**
 * Component for searching schedules.
 * Provides a UI to search for weekly schedules and display the results.
 */
@Component({
  selector: 'app-search-schedules',
  standalone:true,
  imports: [
    TranslatePipe,
    WeeklyScheduleSearchComponent
  ],
  templateUrl: './search-schedules.component.html',
  styleUrl: './search-schedules.component.css'
})
export class SearchSchedulesComponent {

}
