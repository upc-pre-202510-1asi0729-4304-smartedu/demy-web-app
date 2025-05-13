import { Routes } from '@angular/router';
import { PaymentsComponent } from './billing/pages/payments/payments.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { OrganizationLayoutComponent } from './shared/components/organization-layout/organization-layout.component';
import { LoginComponent } from './public/pages/login/login.component';
import { SignUpComponent } from './public/pages/sign-up/sign-up.component';
import { PlanSelectComponent } from './public/pages/plan-select/plan-select.component';
import { TeacherOverviewComponent } from './iam-user/pages/teacher-overview/teacher-overview.component';
import { ExpensesPageComponent} from './billing/pages/expenses-page/expenses-page.component';
import {AttendancePageComponent} from './attendance/pages/attendance-page/attendance-page.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'organization', component: OrganizationLayoutComponent },
      { path: 'organization/teachers', component: TeacherOverviewComponent },
      { path: 'payments', component: PaymentsComponent },
      { path: 'attendance', component:AttendancePageComponent},
      { path: 'finance', component: ExpensesPageComponent,
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
  }
];
