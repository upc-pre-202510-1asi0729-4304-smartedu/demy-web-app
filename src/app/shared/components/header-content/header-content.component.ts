import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton, MatButtonModule } from "@angular/material/button";
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';

@Component({
  selector: 'app-header-content',
  imports: [
    MatToolbar,
    MatIcon,
    MatIconButton,
    MatButtonModule,
    LanguageSwitcherComponent
  ],
  templateUrl: './header-content.component.html',
  styleUrl: './header-content.component.css'
})
export class HeaderContentComponent {
  @Input() isMobile: boolean = false;

  @Output() menuToggle = new EventEmitter<void>();

}
