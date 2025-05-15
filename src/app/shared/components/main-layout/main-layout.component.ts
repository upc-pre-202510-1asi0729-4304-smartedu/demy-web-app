import { Component, signal } from '@angular/core';
import { HeaderContentComponent } from '../header-content/header-content.component';
import { SideNavigationBarComponent } from '../side-navigation-bar/side-navigation-bar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { RouterOutlet } from '@angular/router';
import { ContentWrapperComponent } from '../content-wrapper/content-wrapper.component';

/**
 * Main layout component that integrates all structural elements including header,
 * sidebar and routed content. Handles responsive layout detection and global actions.
 *
 * @example
 * <app-main-layout></app-main-layout>
 */
@Component({
  selector: 'app-main-layout',
  imports: [
    HeaderContentComponent,
    SideNavigationBarComponent,
    MatSidenavModule,
    RouterOutlet,
    ContentWrapperComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  /**
   * Signal indicating if the application is in mobile view.
   * Updates automatically when screen size changes.
   */
  readonly isMobile = signal<boolean>(false);

  /**
   * Initializes responsive layout detection.
   */
  constructor(private observer: BreakpointObserver) {
    this.observer.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile.set(result.matches);
    });
  }

  /**
   * Handles user logout process.
   * Should clear auth tokens and redirect to login page.
   *
   */
  logout(): void {
    console.log('Cerrar sesión');
  }
}
