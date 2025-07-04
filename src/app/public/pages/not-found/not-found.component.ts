import { Component } from '@angular/core';

/**
 * Component for displaying a 404 "Page Not Found" error page.
 *
 * @summary
 * This component is shown when a user navigates to an undefined or non-existent route.
 * Typically used to enhance user experience by providing a friendly message and a navigation option.
 *
 * @remarks
 * You can customize the template to include helpful links or buttons to redirect users back to the homepage.
 */
@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

}
