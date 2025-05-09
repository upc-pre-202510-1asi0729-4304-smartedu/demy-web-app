import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ContextualToggleNavComponent } from '../../../shared/components/contextual-toggle-nav/contextual-toggle-nav.component';

@Component({
  selector: 'app-finance-layout',
  imports: [
    ContextualToggleNavComponent,
    RouterOutlet
  ],
  templateUrl: './finance-layout.component.html',
  styleUrl: './finance-layout.component.css'
})
export class FinanceLayoutComponent {
  toggleOptions = [
    { label: 'Registrar egreso', value: 'expenses' },
    { label: 'Reportes', value: 'reports' }
  ];

  selectedView = '';

  constructor(private router: Router) {
    const initialUrl = this.router.url;
    const match = this.toggleOptions.find(opt => initialUrl.includes(opt.value))
    this.selectedView = match?.value ?? this.toggleOptions[0].value;

    this.router.events.subscribe(() => {
      const url = this.router.url;
      const active = this.toggleOptions.find(opt => url.includes(opt.value));
      if (active) {
        this.selectedView = active.value;
      }
    });
  }

  onToggleSelect(view: string) {
    this.selectedView = view;
    void this.router.navigate([`/finance/${view}`]);
  }
}
