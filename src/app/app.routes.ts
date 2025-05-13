import { Routes } from '@angular/router';
import { DashboardComponent } from './workspace/pages/dashboard/dashboard.component';
import { PaymentsComponent } from './billing/pages/payments/payments.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { OrganizationComponent } from './workspace/pages/organization/organization.component';
import { LoginComponent } from './public/pages/login/login.component';
import { ExpensesPageComponent} from './billing/pages/expenses-page/expenses-page.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'organization', component: OrganizationComponent },
      { path: 'workspace', component: DashboardComponent },
      { path: 'payments', component: PaymentsComponent },
      { path: 'finance', component: ExpensesPageComponent,
      },
      { path: '', redirectTo: 'workspace', pathMatch: 'full' }
    ]
  },
  { path: 'login',
    component: LoginComponent
  }
];
