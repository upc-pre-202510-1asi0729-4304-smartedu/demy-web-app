import {Component, EventEmitter, Output} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import{TranslatePipe} from '@ngx-translate/core';

/**
 * Standalone component that renders a save button for attendance submission.
 *
 * The component emits an event when the user clicks the button,
 * allowing the parent component to handle the save operation.
 * It uses Angular Material for styling and `ngx-translate` for localization.
 */
@Component({
  selector: 'app-attendance-save-button',
  standalone: true,
  templateUrl: './attendance-save-button.component.html',
  styleUrls: ['./attendance-save-button.component.css'],
  imports: [MatButtonModule, TranslatePipe]
})
export class AttendanceSaveButtonComponent {
  /**
   * Event emitted when the save button is clicked.
   * Used to notify the parent component to trigger a save action.
   */
  @Output() saveClicked = new EventEmitter<void>();

  /**
   * Emits the `saveClicked` event.
   * Should be called when the save button is pressed.
   */
  save(): void {
    this.saveClicked.emit(); // emite evento al padre
    window.alert('¡Asistencia guardada con éxito!');
  }
}
