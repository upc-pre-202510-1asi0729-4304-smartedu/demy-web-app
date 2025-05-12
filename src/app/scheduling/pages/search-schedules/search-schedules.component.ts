import { Component } from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {WeeklyScheduleSearchComponent} from '../../components/weekly-schedule-search/weekly-schedule-search.component';


@Component({
  selector: 'app-search-schedules',
  imports: [
    TranslatePipe,
    WeeklyScheduleSearchComponent
  ],
  templateUrl: './search-schedules.component.html',
  styleUrl: './search-schedules.component.css'
})
export class SearchSchedulesComponent {

}
