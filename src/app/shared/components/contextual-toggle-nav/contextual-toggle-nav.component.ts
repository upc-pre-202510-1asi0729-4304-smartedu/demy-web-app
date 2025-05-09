import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-contextual-toggle-nav',
  imports: [
    MatButtonToggleModule
  ],
  templateUrl: './contextual-toggle-nav.component.html',
  styleUrl: './contextual-toggle-nav.component.css'
})
export class ContextualToggleNavComponent {
  @Input() options: { label: string; value: string }[] = [];
  @Input() selected = '';
  @Output() select = new EventEmitter<string>();

  onSelectionChange(value: string) {
    this.select.emit(value);
  }
}
