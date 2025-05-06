import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/pages/dashboard/dashboard.component';
import { SearchComponent } from './billing/pages/search/search.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'search', component: SearchComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
