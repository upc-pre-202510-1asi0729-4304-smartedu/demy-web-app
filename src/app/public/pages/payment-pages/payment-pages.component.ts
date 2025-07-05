import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { LanguageSwitcherComponent } from '../../../shared/components/language-switcher/language-switcher.component';
import { TranslateModule } from '@ngx-translate/core';
import {environment} from '../../../../environments/environment';
import { Router } from '@angular/router';

/**
 * Component representing the payment page using Stripe integration.
 *
 * @summary
 * Loads and mounts Stripe Elements for card payments.
 * Collects cardholder and address information, creates a payment intent,
 * and confirms the payment. Displays success or error messages accordingly.
 */
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    TranslateModule,
    LanguageSwitcherComponent
  ],
  templateUrl: './payment-pages.component.html',
  styleUrls: ['./payment-pages.component.css']
})
export class PaymentPagesComponent implements OnInit {

  /**
   * Stripe instance used to handle the payment process.
   */
  stripe: Stripe | null = null;

  /**
   * Stripe Elements instance used to manage card UI components.
   */
  elements: StripeElements | null = null;

  /**
   * The Stripe card element injected into the DOM.
   */
  cardElement: any;

  /**
   * The cardholder's name entered by the user.
   */
  cardholderName: string = '';

  /**
   * The billing address entered by the user.
   */
  address: string = '';

  /**
   * Constructs the component with injected router service.
   *
   * @param router - Angular Router used for navigation after payment.
   */
  constructor(private router: Router) {}

  /**
   * Initializes Stripe and mounts the card input element on page load.
   */
  async ngOnInit() {
    /**
     * Stripe PUBLIC PASSWORD
     */
    this.stripe = await loadStripe('pk_test_51RhIvOH8OX5Et22r5j2knyo9ZQoJtTxf8yrADtITSSQZpY5jmHbxE65RTbty4lwjJ7YgG8YS8utn7keEZgK38nCe00b8X9q9Ax');

    if (!this.stripe) {
      alert('Stripe could not be loaded');
      return;
    }

    this.elements = this.stripe.elements();
    this.cardElement = this.elements.create('card');
    this.cardElement.mount('#card-element');
  }

  /**
   * Initiates the payment process:
   * - Sends user and plan data to the backend to create a PaymentIntent.
   * - Confirms the payment with the card element.
   * - Displays success or error alerts based on the result.
   */
  async pay() {
    const url = `${environment.apiBaseUrl}${environment.payEndpointPath}${environment.intentEndpointPath}`;
    const amount = Number(localStorage.getItem('selectedPlanAmount') || '5000'); // fallback $50.00
    const name = localStorage.getItem('user_name') || 'Invitado';
    const email = localStorage.getItem('user_email') || 'guest@example.com';
    const planName = localStorage.getItem('selectedPlanName') || 'Unknown Plan';
    const cardholderName = this.cardholderName || 'Titular desconocido';
    const address = this.address || 'Lugar desconocido';

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, description: planName, name,email,cardholderName,address  })
    });

    const { clientSecret } = await res.json();

    const result = await this.stripe!.confirmCardPayment(clientSecret, {
      payment_method: {
        card: this.cardElement,
        billing_details: {
          name: cardholderName,
          email,
          address: {
            line1: this.address
          }

        }
      }
    });

    if (result.error) {
      alert('❌ Error: ' + result.error.message);
    } else if (result.paymentIntent?.status === 'succeeded') {
      const amountInCents = result.paymentIntent.amount;
      const amountInDollars = (amountInCents / 100).toFixed(2);
      alert(`✅ ¡Gracias! Tu pago de $${amountInDollars} USD fue procesado con éxito.`);
      this.router.navigate(['/login']);
    }
  }
}

