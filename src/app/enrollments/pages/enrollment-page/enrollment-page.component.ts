import { Component } from '@angular/core';
import { ContextualToggleNavComponent } from '../../../shared/components/contextual-toggle-nav/contextual-toggle-nav.component';
import { EnrollmentsManagementComponent } from '../enrollment-management/enrollment-management.component';
import { EnrollmentsSearchComponent } from '../enrollments-search/enrollments-search.component';

@Component({
  selector: 'app-enrollment-page',
  standalone: true,
  imports: [
    ContextualToggleNavComponent,
    EnrollmentsManagementComponent,
    EnrollmentsSearchComponent,
  ],
  templateUrl: './enrollment-page.component.html',
  styleUrl: './enrollment-page.component.css'
})
export class EnrollmentPageComponent {
  options = [
    { label: 'Registrar Matrícula', value: 'register' },
    { label: 'Buscar Matrícula', value: 'search' }
  ];
  selectedPage = 'register';

  onPageSelected(page: string) {
    this.selectedPage = page;
  }
}
