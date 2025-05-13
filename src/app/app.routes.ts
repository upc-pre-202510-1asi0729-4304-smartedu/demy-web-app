import { Routes } from '@angular/router';
import { DashboardComponent } from './workspace/pages/dashboard/dashboard.component';
import { PaymentsComponent } from './billing/pages/payments/payments.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { OrganizationComponent } from './workspace/pages/organization/organization.component';
import { LoginComponent } from './public/pages/login/login.component';
import { FinanceLayoutComponent } from './finance/components/finance-layout/finance-layout.component';
import { ExpensesComponent } from './finance/pages/expenses/expenses.component';
import { ReportsComponent } from './finance/pages/reports/reports.component';
import {StudentManagementComponent} from './enrollments/pages/student-management/student-management.component';
import {EnrollmentLayoutComponent} from './enrollments/components/enrollment-layout/enrollment-layout.component';
import {
  AcademicPeriodManagementComponent
} from './enrollments/pages/academic-period-management/academic-period-management.component';
import {EnrollmentsManagementComponent} from './enrollments/pages/enrollment-management/enrollment-management.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'organization', component: OrganizationComponent },
      { path: 'workspace', component: DashboardComponent },
      { path: 'payments', component: PaymentsComponent },
      {
        path: 'enrollment',
        component: EnrollmentLayoutComponent,
        children: [
          { path: '', component: EnrollmentsManagementComponent },
          { path: 'students', component: StudentManagementComponent },
          { path: 'academic-periods', component: AcademicPeriodManagementComponent },
        ]
      },
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
  }
];
