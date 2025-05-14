import {Component, EventEmitter, Output} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import{TranslatePipe} from '@ngx-translate/core';

/**
 * A standalone component that renders a save button
 * used to trigger saving attendance data.
 *
 * The component emits an event when the button is clicked.
 * It uses Angular Material for styling and ngx-translate for localization.
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
 * Event emitted when the user clicks the save button.
 * Used to notify the parent component to perform a save action.
 */

  @Output() saveClicked = new EventEmitter<void>();
  /**
   * Emits the `saveClicked` event.
   * Call this method when the save button is clicked.
   */
  save(): void {
    this.saveClicked.emit(); // emite evento al padre
    window.alert('¡Asistencia guardada con éxito!');
  }
}
