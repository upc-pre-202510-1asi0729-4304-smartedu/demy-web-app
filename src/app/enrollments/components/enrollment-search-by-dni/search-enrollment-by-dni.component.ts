import { Component, EventEmitter, Output } from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


/**
 * Standalone component for searching enrollments by dni.
 *
 * Provides a text input with an action button and emits a trimmed search string
 * to the parent component when triggered via click or Enter key.
 */

@Component({
  selector: 'app-enrollment-search-by-dni',
  standalone: true,
  imports: [
    MatIconButton,
    MatButtonModule,
    MatIconModule,
    TranslatePipe,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './search-enrollment-by-dni.component.html',
  styleUrl: './search-enrollment-by-dni.component.css'
})

export class SearchEnrollmentByDniComponent {
  value = '';

  @Output() search = new EventEmitter<string>();

  onSearchClick() {
    const trimmed = this.value.trim();
    if (!trimmed) return;
    this.value = trimmed;
    console.log('Búsqueda ejecutada para DNI', trimmed);
    this.search.emit(trimmed);
  }
}


