import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/pages/dashboard/dashboard.component';
import { PaymentsComponent } from './billing/pages/payments/payments.component';
import { MainLayoutComponent } from './public/components/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'payments', component: PaymentsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];
