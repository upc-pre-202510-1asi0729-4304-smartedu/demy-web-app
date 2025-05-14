import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
/**
 * A standalone Angular component that provides a dropdown
 * for selecting a class (e.g., Math, History, Physics)
 * for attendance purposes.
 *
 * This component uses Angular Material's `mat-select`
 * and supports translation via `ngx-translate`.
 */

@Component({
  selector: 'app-attendance-class-select',
  standalone: true,
  templateUrl: './attendance-class-select.component.html',
  styleUrls: ['./attendance-class-select.component.css'],
  imports: [
    TranslatePipe,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule
  ]
})
export class AttendanceClassSelectComponent {
  /**
   * The list of available classes to choose from.
   * Each class has an `id` (used internally) and a `name` (displayed to the user).
   */

  classes = [
    { id: 'matematicas', name: 'Matemáticas' },
    { id: 'historia', name: 'Historia' },
    { id: 'fisica', name: 'Física' }
  ];
  /**
   * The identifier of the currently selected class.
   */
  selectedClass: string = '';
}
