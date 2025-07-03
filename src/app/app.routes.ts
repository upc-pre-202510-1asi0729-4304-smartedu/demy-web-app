import { Routes } from '@angular/router';
import { PaymentsComponent } from './billing/pages/payments/payments.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { OrganizationLayoutComponent } from './shared/components/organization-layout/organization-layout.component';
import { LoginComponent } from './public/pages/login/login.component';
import { SignUpComponent } from './public/pages/sign-up/sign-up.component';
import { RecoverPasswordComponent } from  './public/pages/recover-password/recover-password.component';
import { ResetPasswordComponent} from './public/pages/reset-password/reset-password.component';
import {AuthenticationSectionComponent} from './iam-user/components/authentication-section/authentication-section.component';


import { PlanSelectComponent } from './public/pages/plan-select/plan-select.component';
import { TeacherOverviewComponent } from './iam-user/pages/teacher-overview/teacher-overview.component';
import { ExpensesPageComponent} from './billing/pages/expenses-page/expenses-page.component';
import {AttendancePageComponent} from './attendance/pages/attendance-page/attendance-page.component';
import {StudentManagementComponent} from './enrollments/pages/student-management/student-management.component';
import {EnrollmentLayoutComponent} from './enrollments/components/enrollment-layout/enrollment-layout.component';
import {
  AcademicPeriodManagementComponent
} from './enrollments/pages/academic-period-management/academic-period-management.component';
import {EnrollmentsManagementComponent} from './enrollments/pages/enrollment-management/enrollment-management.component';
import {authenticationGuard} from './iam-user/authentication/authentication.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authenticationGuard],
    component: MainLayoutComponent,
    children: [
      { path: 'organization', component: OrganizationLayoutComponent },
      { path: 'organization/teachers', component: TeacherOverviewComponent },
      { path: 'payments', component: PaymentsComponent },
      { path: 'attendance', component:AttendancePageComponent},
      { path: 'finance', component: ExpensesPageComponent },
      {
        path: 'enrollment',
        component: EnrollmentLayoutComponent,
        children: [
          { path: '', component: EnrollmentsManagementComponent },
          { path: 'students', component: StudentManagementComponent },
          { path: 'academic-periods', component: AcademicPeriodManagementComponent },
        ]
      },
      { path: '', redirectTo: 'organization', pathMatch: 'full' }
    ]
  },
  { path: 'login',
    component: LoginComponent
  },
  { path: 'signup',
    component: SignUpComponent
  },
  { path: 'planSelect',
    component: PlanSelectComponent
  },
  { path: 'forgot-password',
    component: RecoverPasswordComponent
  },
  { path: 'reset-password',
    component: ResetPasswordComponent
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
