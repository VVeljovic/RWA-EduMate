import { Body, Controller, Post } from '@nestjs/common';
import { Cart } from './cart.module';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
    constructor(private stripeService:StripeService){

    }
    @Post()
   async checkout(@Body() cart:Cart){
        console.log(cart);
         const paymentIntent= await this.stripeService.checkout(cart);
         const clientSecret = paymentIntent.client_secret;
          return {clientSecret};
        
    }
}
