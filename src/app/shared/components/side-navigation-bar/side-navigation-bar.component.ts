import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatListModule } from '@angular/material/list';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../iam-user/services/user.service';

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
  protected readonly userService = inject(UserService);
  private readonly router = inject(Router);
  /**
   * List of navigation options with icon, label, and route.
   */
  navOptions = [
    { icon: 'apartment', label: 'Mi organización', route: '/organization', roles: ['ADMIN'] },
    { icon: 'assignment', label: 'Matrícula', route: '/enrollment', roles: ['ADMIN'] },
    { icon: 'group', label: 'Alumnos', route: '/students', roles: ['ADMIN'] },
    { icon: 'payments', label: 'Pagos', route: '/payments', roles: ['ADMIN'] },
    { icon: 'schedule', label: 'Horarios', route: '/search-schedules', roles: ['ADMIN'] },
    { icon: 'schedule', label: 'Mi Horario', route: '/my-schedule', roles: ['TEACHER'] },
    { icon: 'check_circle', label: 'Asistencia', route: '/attendance',roles: ['TEACHER'] },
    { icon: 'account_balance', label: 'Finanzas', route: '/finance', roles: ['ADMIN'] }
  ];

  get visibleNavOptions() {
    const role = this.userService.getUserRole();

    // Si el rol es válido, filtra según las opciones permitidas
    if (['ADMIN', 'TEACHER'].includes(role ?? '')) {
      return this.navOptions.filter(opt => opt.roles.includes(role!));
    }

    // Si el rol es desconocido o null, mostrar todas las opciones
    return this.navOptions;
  }

  /**
   * Emits when the logout action is triggered.
   */
  @Output() logout = new EventEmitter<void>();

  handleLogout(): void {
    this.userService.clearUserData();
    this.logout.emit();
    this.router.navigate(['/login']);
  }
}
