import { Component, EventEmitter, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {TranslatePipe} from "@ngx-translate/core";

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
  value = '';

  @Output() search = new EventEmitter<string>();

  onSearchClick() {
    console.log('🔍 Búsqueda ejecutada desde Enter o botón'); // <-- clave
    this.search.emit(this.value.trim());
  }
}
