import { Routes } from '@angular/router';
import { PaymentsComponent } from './billing/pages/payments/payments.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { OrganizationLayoutComponent } from './shared/components/organization-layout/organization-layout.component';
import { LoginComponent } from './public/pages/login/login.component';
import { ExpensesPageComponent} from './billing/pages/expenses-page/expenses-page.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'organization', component: OrganizationLayoutComponent },
      { path: 'payments', component: PaymentsComponent },
      { path: 'finance', component: ExpensesPageComponent,
      },
      { path: '', redirectTo: 'organization', pathMatch: 'full' }
    ]
  },
  { path: 'login',
    component: LoginComponent
  }
];
