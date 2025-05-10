import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-organization-option',
  imports: [
    RouterModule,
    MatCardModule
  ],
  templateUrl: './organization-option.component.html',
  styleUrl: './organization-option.component.css'
})
export class OrganizationOptionComponent {
  @Input() title!: string;
  @Input() description?: string;
  @Input() image!: string;
  @Input() route!: string;
}
