import { Component, EventEmitter, Output } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';

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
  navOptions = [
    { icon: 'apartment', label: 'Mi organización', route: '/organization-layout' },
    { icon: 'assignment', label: 'Matrícula', route: '/enrollment' },
    { icon: 'group', label: 'Alumnos', route: '/students' },
    { icon: 'payments', label: 'Pagos', route: '/payments' },
    { icon: 'schedule', label: 'Horarios', route: '/schedules' },
    { icon: 'check_circle', label: 'Asistencia', route: '/attendance' },
    { icon: 'account_balance', label: 'Finanzas', route: '/finance' }
  ];

  @Output() logout = new EventEmitter<void>();
}
