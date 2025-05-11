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
    {
      title: 'organization.profile.title',
      description: 'organization.profile.description',
      image: 'assets/img/organization-profile.jpg',
      route: '/organization/profile'
    },
    {
      title: 'organization.courses.title',
      description: 'organization.courses.description',
      image: 'assets/img/organization-courses.jpg',
      route: '/organization/courses'
    },
    {
      title: 'organization.periods.title',
      description: 'organization.periods.description',
      image: 'assets/img/organization-periods.jpg',
      route: '/organization/periods'
    },
    {
      title: 'organization.rooms.title',
      description: 'organization.rooms.description',
      image: 'assets/img/organization-rooms.jpg',
      route: '/organization/rooms'
    },
    {
      title: 'organization.teachers.title',
      description: 'organization.teachers.description',
      image: 'assets/img/organization-teachers.jpg',
      route: '/organization/teachers'
    }
  ];
}
