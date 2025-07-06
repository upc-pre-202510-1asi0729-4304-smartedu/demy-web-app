import {Component, inject} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslatePipe}  from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import {LanguageSwitcherComponent} from '../../../shared/components/language-switcher/language-switcher.component';
import { NotificationService } from '../../../shared/services/notification.service';


/**
 * Component for displaying and selecting a subscription plan.
 *
 * @summary
 * This component presents a list of predefined subscription plans, each with translated
 * titles, pricing, and benefits. The user can select a plan and proceed with the application flow.
 *
 * @remarks
 * Translations are handled using ngx-translate. The actual values are resolved in the template
 * using the translation keys.
 */
@Component({
  selector: 'app-plan-select',
  imports: [
    CommonModule,
    TranslatePipe,
    MatButtonModule,
    LanguageSwitcherComponent
  ],
  templateUrl: './plan-select.component.html',
  styleUrls: ['./plan-select.component.css']
})
export class PlanSelectComponent {


  /**
   * List of available plans using translation keys.
   * Each plan includes a title, subtitle, price, and a list of benefits.
   */
  plans: any[] = [];

  private notification = inject(NotificationService);

  /**
   * Constructs the PlanSelectComponent.
   *
   * @param translate - The translation service used to load localized content.
   * @param router - The Angular Router used for navigation.
   */
  constructor(private translate: TranslateService,private router: Router) {
    this.loadPlans();
  }

  /**
   * Loads the available subscription plans using translation keys.
   * This ensures the UI is language-agnostic and fully translatable.
   */
  loadPlans() {
    this.translate.get([
      'plan-select.plan1',
      'plan-select.plan2',
      'plan-select.plan3'
    ]).subscribe(translations => {
      this.plans = [
        {
          subtitle: 'plan1.subtitle',
          title: 'plan1.title',
          price: 'plan1.price',
          priceValue: 1990 ,
          planName: 'Essentials - Basic Plan',
          benefits: [
            'plan1.benefit1',
            'plan1.benefit2',
            'plan1.benefit3',
            'plan1.benefit4'
          ],
        },
        {
          subtitle: 'plan2.subtitle',
          title: 'plan2.title',
          price: 'plan2.price',
          priceValue: 7000,
          planName: 'Pro - Intermediate Plan',
          benefits: [
            'plan2.benefit1',
            'plan2.benefit2',
            'plan2.benefit3',
            'plan2.benefit4',
            'plan2.benefit5'
          ],
        },
        {
          subtitle: 'plan3.subtitle',
          title: 'plan3.title',
          price: 'plan3.price',
          priceValue: 16000,
          planName: 'Elite -Premium Plan',

          benefits: [
            'plan3.benefit1',
            'plan3.benefit2',
            'plan3.benefit3',
            'plan3.benefit4',
            'plan3.benefit5',
            'plan3.benefit6'
          ],
        }
      ];
    });
  }
  selectedPlan: any = null;
  selectedPlanName: string | null = null;

  /**
   * Handles the user’s plan selection.
   * Navigates the user to the organization setup route.
   */
  selectPlan(plan: any) {
    this.selectedPlan = plan;
    localStorage.setItem('selectedPlanAmount', plan.priceValue.toString());
    localStorage.setItem('selectedPlanName', plan.planName);

    this.translate.get('plan-select.selected-message', { planName: plan.planName }).subscribe(message => {
      this.notification.showSuccess(message);
    });

    this.router.navigate(['/payment']);
  }
}
