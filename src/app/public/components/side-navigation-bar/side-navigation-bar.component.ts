import { Component, EventEmitter, Output } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatAnchor, MatButton } from "@angular/material/button";

@Component({
  selector: 'app-side-navigation-bar',
  imports: [
    MatIcon,
    MatButton,
    MatAnchor
  ],
  templateUrl: './side-navigation-bar.component.html',
  styleUrl: './side-navigation-bar.component.css'
})
export class SideNavigationBarComponent {
  @Output() logout = new EventEmitter<void>();
}
