import { Component } from '@angular/core';
import {OrganizationOptionComponent} from '../../components/organization-option/organization-option.component';
import {OrganizationProfileComponent} from '../../components/organization-profile/organization-profile.component';

@Component({
  selector: 'app-organization',
  imports: [
    OrganizationOptionComponent,
    OrganizationProfileComponent
  ],
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.css'
})
export class OrganizationComponent {

}
