import { Component, EventEmitter, Output } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatAnchor, MatButton } from "@angular/material/button";
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-side-navigation-bar',
  imports: [
    MatIcon,
    MatButton,
    MatAnchor,
    MatListModule
  ],
  templateUrl: './side-navigation-bar.component.html',
  styleUrl: './side-navigation-bar.component.css'
})
export class SideNavigationBarComponent {
  @Output() logout = new EventEmitter<void>();
}
