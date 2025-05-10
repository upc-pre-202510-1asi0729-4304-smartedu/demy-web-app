import { Component } from '@angular/core';
import {OrganizationOptionComponent} from '../../components/organization-option/organization-option.component';

@Component({
  selector: 'app-organization',
  imports: [
    OrganizationOptionComponent,
  ],
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.css'
})
export class OrganizationComponent {
  options = [
    { title: 'Perfil', description: 'Gestiona los miembros de tu organización', image: 'assets/img/organization-profile.jpg', route: '/organization/profile' },
    { title: 'Cursos', description: 'Administra accesos y roles', image: 'assets/img/organization-courses.jpg', route: '/organization/courses' },
    { title: 'Periodos', description: 'Modifica la información general', image: 'assets/img/organization-periods.jpg', route: '/organization/periods' },
    { title: 'Aulas', description: 'Modifica la información general', image: 'assets/img/organization-rooms.jpg', route: '/organization/rooms' },
    { title: 'Profesores', description: 'Modifica la información general', image: 'assets/img/organization-teachers.jpg', route: '/organization/teachers' }
  ];
}
