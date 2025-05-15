import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

/**
 * Toggle navigation component for selecting a contextual option.
 * Displays a list of toggle buttons based on provided options.
 */
@Component({
  selector: 'app-contextual-toggle-nav',
  imports: [
    MatButtonToggleModule
  ],
  templateUrl: './contextual-toggle-nav.component.html',
  styleUrl: './contextual-toggle-nav.component.css'
})
export class ContextualToggleNavComponent {
  /**
   * List of toggle options to display.
   * Each option should have a `label` and a `value`.
   */
  @Input() options: { label: string; value: string }[] = [];

  /**
   * Currently selected value.
   */
  @Input() selected = '';

  /**
   * Emits when a new option is selected.
   */
  @Output() select = new EventEmitter<string>();

  /**
   * Handles selection changes and emits the selected value.
   *
   * @param value - Selected option value
   */
  onSelectionChange(value: string) {
    this.select.emit(value);
  }
}
