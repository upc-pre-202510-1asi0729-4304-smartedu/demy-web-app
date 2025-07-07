import { Component, EventEmitter, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {TranslatePipe} from "@ngx-translate/core";

/**
 * Standalone component for searching students by name or identifier.
 *
 * Provides a text input with an action button and emits a trimmed search string
 * to the parent component when triggered via click or Enter key.
 */
@Component({
  selector: 'app-student-search',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    TranslatePipe
  ],
  templateUrl: './student-search.component.html',
  styleUrl: './student-search.component.css'
})
export class StudentSearchComponent {
  /**
   * Holds the value entered in the search input field.
   */
  value = '';

  /**
   * Event emitted when the user triggers a search.
   * Sends a trimmed DNI string to the parent component.
   */
  @Output() search = new EventEmitter<string>();

  /**
   * Called when the search button is clicked or Enter is pressed.
   * Emits the trimmed search input via the `search` output.
   */
  onSearchClick() {
    console.log('🔍 Búsqueda ejecutada desde Enter o botón');
    this.search.emit(this.value.trim());
  }
}
