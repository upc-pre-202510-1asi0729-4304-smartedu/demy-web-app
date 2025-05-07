import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/pages/dashboard/dashboard.component';
import { PaymentsComponent } from './billing/pages/payments/payments.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HeaderContentComponent } from './shared/components/header-content/header-content.component';
import { OrganizationComponent } from './dashboard/pages/organization/organization.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'payments', component: PaymentsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: '',
    component: HeaderContentComponent,
    children: [
      { path: 'organization', component: OrganizationComponent }
    ]
  }
];
