import { Routes } from '@angular/router';
import { PaymentsComponent } from './billing/pages/payments/payments.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { OrganizationLayoutComponent } from './shared/components/organization-layout/organization-layout.component';
import { LoginComponent } from './public/pages/login/login.component';
import { CoursesOverviewComponent} from './scheduling/pages/courses-overview/courses-overview.component';
import { ClassroomOverviewComponent} from './scheduling/pages/classroom-overview/classroom-overview.component';
import {WeeklySchedulesOverviewComponent} from './scheduling/pages/weekly-schedules-overview/weekly-schedules-overview.component';
import { SearchSchedulesComponent } from './scheduling/pages/search-schedules/search-schedules.component';
import {TeacherScheduleComponent} from './scheduling/pages/teacher-schedule/teacher-schedule.component';

import { SignUpComponent } from './public/pages/sign-up/sign-up.component';
import { RecoverPasswordComponent } from  './public/pages/recover-password/recover-password.component';
import { ResetPasswordComponent} from './public/pages/reset-password/reset-password.component';


import { PlanSelectComponent } from './public/pages/plan-select/plan-select.component';
import { TeacherOverviewComponent } from './iam-user/pages/teacher-overview/teacher-overview.component';
import { ExpensesPageComponent} from './billing/pages/expenses-page/expenses-page.component';
import {AttendancePageComponent} from './attendance/pages/attendance-page/attendance-page.component';
import {AttendanceReportPageComponent} from './attendance/pages/attendance-report-page/attendance-report-page.component';

import {StudentManagementComponent} from './enrollments/pages/student-management/student-management.component';
import {
  AcademicPeriodManagementComponent
} from './enrollments/pages/academic-period-management/academic-period-management.component';
import {EnrollmentsManagementComponent} from './enrollments/pages/enrollment-management/enrollment-management.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'organization', component: OrganizationLayoutComponent },
      { path: 'organization/teachers', component: TeacherOverviewComponent },
      { path: 'organization/courses', component: CoursesOverviewComponent},
      { path: 'organization/classrooms', component: ClassroomOverviewComponent},
      { path: 'organization/academic-periods', component: AcademicPeriodManagementComponent},
      { path: 'organization/weekly-schedules', component: WeeklySchedulesOverviewComponent},
      { path: 'payments', component: PaymentsComponent },
      { path: 'attendance', component:AttendancePageComponent},
      { path: 'attendance-reports', component:AttendanceReportPageComponent},
      { path: 'finance', component: ExpensesPageComponent },
      { path: 'search-schedules', component: SearchSchedulesComponent },
      { path: 'my-schedule', component: TeacherScheduleComponent },
      { path: 'students',component: StudentManagementComponent},
      {path: 'enrollment', component: EnrollmentsManagementComponent},
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
  }
];
