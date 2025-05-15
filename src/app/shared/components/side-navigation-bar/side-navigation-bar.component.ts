import { Component, EventEmitter, Output } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';

/**
 * Sidebar navigation component.
 * Displays a list of navigation options and emits a logout event.
 */
@Component({
  selector: 'app-side-navigation-bar',
  imports: [
    MatIcon,
    MatListModule,
    RouterLink
  ],
  templateUrl: './side-navigation-bar.component.html',
  styleUrl: './side-navigation-bar.component.css'
})
export class SideNavigationBarComponent {
  /**
   * List of navigation options with icon, label, and route.
   */
  navOptions = [
    { icon: 'apartment', label: 'Mi organización', route: '/organization' },
    { icon: 'assignment', label: 'Matrícula', route: '/enrollment' },
    { icon: 'group', label: 'Alumnos', route: '/students' },
    { icon: 'payments', label: 'Pagos', route: '/payments' },
    { icon: 'schedule', label: 'Horarios', route: '/search-schedules' },
    { icon: 'check_circle', label: 'Asistencia', route: '/attendance' },
    { icon: 'account_balance', label: 'Finanzas', route: '/finance' }
  ];

  /**
   * Emits when the logout action is triggered.
   */
  @Output() logout = new EventEmitter<void>();
}
