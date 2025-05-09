import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/pages/dashboard/dashboard.component';
import { PaymentsComponent } from './billing/pages/payments/payments.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HeaderContentComponent } from './shared/components/header-content/header-content.component';
import { OrganizationComponent } from './dashboard/pages/organization/organization.component';
import { LoginComponent } from './public/pages/login/login.component';
import { FinanceLayoutComponent } from './finance/components/finance-layout/finance-layout.component';
import { ExpensesComponent } from './finance/pages/expenses/expenses.component';
import { ReportsComponent } from './finance/pages/reports/reports.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'payments', component: PaymentsComponent },
      {
        path: 'finance',
        component: FinanceLayoutComponent,
        children: [
          { path: '', redirectTo: 'expenses', pathMatch: 'full' },
          { path: 'expenses', component: ExpensesComponent },
          { path: 'reports', component: ReportsComponent }
        ]
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: '',
    component: HeaderContentComponent,
    children: [
      { path: 'organization', component: OrganizationComponent },
    ]
  },
  { path: 'login',
    component: LoginComponent
  }
];
