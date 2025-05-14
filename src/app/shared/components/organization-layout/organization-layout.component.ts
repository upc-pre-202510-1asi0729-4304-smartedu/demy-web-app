import { Component } from '@angular/core';
import {OrganizationOptionComponent} from '../organization-option/organization-option.component';

@Component({
  selector: 'app-organization-layout',
  imports: [
    OrganizationOptionComponent,
  ],
  templateUrl: './organization-layout.component.html',
  styleUrl: './organization-layout.component.css'
})
export class OrganizationLayoutComponent {
  options = [
    {
      title: 'organization.courses.title',
      description: 'organization.courses.description',
      image: 'assets/img/organization-courses.jpg',
      route: '/organization/courses'
    },
    {
      title: 'organization.rooms.title',
      description: 'organization.rooms.description',
      image: 'assets/img/organization-rooms.jpg',
      route: '/organization/classrooms'
    },
    {
      title: 'organization.teachers.title',
      description: 'organization.teachers.description',
      image: 'assets/img/organization-teachers.jpg',
      route: '/organization/teachers'
    },
    {
      title: 'organization.weekly.title',
      description: 'organization.weekly.description',
      image: 'assets/img/organization-weekly.jpg',
      route: '/organization/weekly-schedules'
    },
    {
      title: 'organization.periods.title',
      description: 'organization.periods.description',
      image: 'assets/img/organization-periods.jpg',
      route: '/organization/periods'
    },
  ];
}
