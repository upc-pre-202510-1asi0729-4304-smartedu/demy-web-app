import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * Card component that displays a single organization option.
 * Used within the organization layout to navigate to specific features.
 */
@Component({
  selector: 'app-organization-option',
  imports: [
    RouterModule,
    MatCardModule,
    TranslatePipe
  ],
  templateUrl: './organization-option.component.html',
  styleUrl: './organization-option.component.css'
})
export class OrganizationOptionComponent {
  /**
   * Title key for the option (used with translation).
   */
  @Input() title!: string;

  /**
   * Description key for the option (optional).
   */
  @Input() description?: string;

  /**
   * Image path representing the option.
   */
  @Input() image!: string;

  /**
   * Route to navigate when the card is clicked.
   */
  @Input() route!: string;
}
