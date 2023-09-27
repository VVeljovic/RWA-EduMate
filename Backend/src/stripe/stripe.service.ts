import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { Cart } from './cart.module';
@Injectable()
export class StripeService {
    private stripe; 
    constructor(){
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY,{
            apiVersion:'2023-08-16'
        })
    }
    checkout(cart:Cart)
    {

        return this.stripe.paymentIntents.create({
            amount:cart.price*100,
            currency:'usd',
            payment_method_types:['card']
        })
    }
}
