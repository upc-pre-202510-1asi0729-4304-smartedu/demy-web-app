import { Component, signal } from '@angular/core';
import { HeaderContentComponent } from '../header-content/header-content.component';
import { SideNavigationBarComponent } from '../side-navigation-bar/side-navigation-bar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-main-layout',
  imports: [
    HeaderContentComponent,
    SideNavigationBarComponent,
    MatSidenavModule
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  readonly isMobile = signal(false);

  constructor(private observer: BreakpointObserver) {
    this.observer.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile.set(result.matches);
    });
  }

  logout() {
    // lógica para cerrar sesión (vaciar token, redirigir, etc.)
    console.log('Cerrar sesión');
  }
}
