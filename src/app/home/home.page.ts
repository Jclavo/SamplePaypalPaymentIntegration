import { Component } from '@angular/core';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';

//Env
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public paymentAmount: string = '3.33';
  public currency: string = 'BRL';
  // public currencyIcon: string = '$';

  constructor(private payPal: PayPal) {}

  payWithPaypal(){

    console.log(environment.PayPalEnvironmentSandbox);
    this.payPal.init({
      PayPalEnvironmentProduction:  environment.PayPalEnvironmentProduction,
      PayPalEnvironmentSandbox: environment.PayPalEnvironmentSandbox
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        // let payment = new PayPalPayment('3.33', 'USD', 'Description', 'sale');
        let payment = new PayPalPayment(this.paymentAmount, this.currency, 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((res) => {
          console.log(res);
         alert(res);
          // Successfully paid
    
          // Example sandbox response
          //
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, (error) => {
          console.log('Error or render dialog closed without being successful', error)
          // Error or render dialog closed without being successful
        });
      }, (error) => {
        console.log('Error in configuration', error)
        // Error in configuration
      });
    }, (error) => {
      console.log('Error in initialization, maybe PayPal is not supported or something else.', error)
      // Error in initialization, maybe PayPal isn't supported or something else
    });

  }

}
