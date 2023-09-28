import { Component, ElementRef, ViewChild } from '@angular/core';
import { Stripe, StripeCardElement, loadStripe } from '@stripe/stripe-js';
import { STRIPE_PUBLISH_KEY } from 'src/environments/environment';
import { PaymentService } from 'src/app/services/payment.service';

import { tap } from 'rxjs';

@Component({
  selector: 'app-payment-card',
  templateUrl: './payment-card.component.html',
  styleUrls: ['./payment-card.component.scss']
})
export class PaymentCardComponent {
  private stripePromise: Promise<Stripe | null>;
  cardNumber: string = '';
  yearNumber : string = ''
  mounthNumber : string = ''
  cvc: string = '';


  constructor(private service: PaymentService) {
    this.stripePromise = loadStripe(STRIPE_PUBLISH_KEY);
  }

  onCardNumberInput() {
    this.cardNumber = this.cardNumber.replace(/\s/g, '');
   // this.cardNumber = this.cardNumber.replace(/(\d{4})/g, '$1 ');
  }

  onCvcNumberInput() {
    this.cvc = this.cvc.replace(/\s/g, '');
  }
  onYearNumberInput(){
    this.yearNumber = this.yearNumber.replace(/\s/g, '');
  }
  onMounthNumberInput(){
    this.mounthNumber = this.mounthNumber.replace(/\s/g, '');
  }
  onSubmit() {
    console.log(this.cardNumber + this.cvc);
    let response = '';
    this.service.checkout().pipe(
      tap(resp => {
        response = resp.clientSecret;
        console.log(resp);
      })
    ).subscribe(() => {
      console.log(response);
      this.initializeStripe(response);
    });
  }

  async initializeStripe(clientSecret: string) {
    console.log(clientSecret);
    const stripe = await this.stripePromise;
    if (stripe) {

      const elements = stripe.elements();
      const cardElement = elements.create('card');
    
      cardElement.mount('#card-element');
     
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        console.error('Greška prilikom procesiranja plaćanja:', error);
      } else if (paymentIntent.status === 'succeeded') {
        console.log('Plaćanje je uspešno.');
      }
    }
  }
}
