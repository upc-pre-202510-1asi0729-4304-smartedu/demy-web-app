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
    { icon: 'assignment', label: 'Matrícula', route: '/enrollment' },
    { icon: 'group', label: 'Alumnos', route: '/students' },
    { icon: 'payments', label: 'Pagos', route: '/payments' }
  ];

  @Output() logout = new EventEmitter<void>();
}
