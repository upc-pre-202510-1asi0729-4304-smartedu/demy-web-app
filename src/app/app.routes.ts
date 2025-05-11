import { Routes } from '@angular/router';
import { DashboardComponent } from './workspace/pages/dashboard/dashboard.component';
import { PaymentsComponent } from './billing/pages/payments/payments.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { OrganizationComponent } from './workspace/pages/organization/organization.component';
import { LoginComponent } from './public/pages/login/login.component';
import { SignUpComponent } from './public/pages/sign-up/sign-up.component';
import { FinanceLayoutComponent } from './finance/components/finance-layout/finance-layout.component';
import { ExpensesComponent } from './finance/pages/expenses/expenses.component';
import { ReportsComponent } from './finance/pages/reports/reports.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'organization', component: OrganizationComponent },
      { path: 'workspace', component: DashboardComponent },
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
      { path: '', redirectTo: 'workspace', pathMatch: 'full' }
    ]
  },
  { path: 'login',
    component: LoginComponent
  },
  { path: 'signup',
    component: SignUpComponent
  }
];
