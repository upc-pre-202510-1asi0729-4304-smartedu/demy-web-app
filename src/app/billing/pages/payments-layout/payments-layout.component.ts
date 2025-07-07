import { Component } from '@angular/core';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { ContextualToggleNavComponent } from '../../../shared/components/contextual-toggle-nav/contextual-toggle-nav.component';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * Layout page for Payments section.
 * Renders toggle navigation and child routes.
 */
@Component({
  standalone: true,
  selector: 'app-payments-layout',
  imports: [
    CommonModule,
    RouterOutlet,
    ContextualToggleNavComponent,
    TranslatePipe
  ],
  templateUrl: './payments-layout.component.html',
  styleUrl: './payments-layout.component.css'
})
export class PaymentsLayoutComponent {
  selected = '';

  options: { label: string; value: string }[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {
    this.route.firstChild?.url.subscribe(segments => {
      this.selected = segments[0]?.path ?? 'list';
    });

    this.buildOptions();
    this.translate.onLangChange.subscribe(() => this.buildOptions());
  }

  buildOptions() {
    this.options = [
      {
        label: this.translate.instant('payments.nav.list'),
        value: 'list'
      },
      {
        label: this.translate.instant('payments.nav.assign'),
        value: 'assign'
      }
    ];
  }

  onSelect(value: string) {
    void this.router.navigate([value], { relativeTo: this.route });
  }
}
