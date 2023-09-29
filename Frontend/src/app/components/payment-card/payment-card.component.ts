import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


import { Observable, tap } from 'rxjs';
import { NotificationPopupComponent } from '../notification-popup/notification-popup.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-payment-card',
  templateUrl: './payment-card.component.html',
  styleUrls: ['./payment-card.component.scss']
})
export class PaymentCardComponent{
 user$:Observable<User|null>|undefined;
  cardNumber: string = '';
  yearNumber : string = ''
  mounthNumber : string = ''
  cvc: string = '';


  constructor(private dialogRef:MatDialog,private userService:UserService) {
    
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
    // Uklonite sve razmake iz brojeva kartice i CVC-a
    const cleanedCardNumber = this.cardNumber.replace(/\s/g, '');
    const cleanedCvc = this.cvc.replace(/\s/g, '');
  
    // Razdvojite uneti datum u formatu "MM/YY" u godinu i mesec
    const [inputMonth, inputYear] = this.formatExpirationDate().split('/').map(Number);
  
    // Dobavite trenutni datum
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Dobijanje poslednje dve cifre trenutne godine
    const currentMonth = currentDate.getMonth() + 1; // Januar je 0, zato dodajemo 1
  
    // Proverite da li je broj kartice različit od "4242424242424242"
    if (cleanedCardNumber !== '4242424242424242') {
     this.dialogRef.open(NotificationPopupComponent,{
      data:{text:"You don't have sufficient funds in your account."}
     })
      return;
    }
  
    // Proverite da li je datum isteka prošao
    if (inputYear < currentYear || (inputYear === currentYear && inputMonth < currentMonth)) {
      this.dialogRef.open(NotificationPopupComponent,{
        data:{text:"The date has expired"}
       })
    } else {
      
       
        this.userService.changeRole();
        this.dialogRef.open(NotificationPopupComponent,{
          data:{title:"You are premium now!",text:"Please login again!"}
         })
      
      // Ovde možete izvršiti logiku za uspešno plaćanje
    }
  }
  
  // Metod za formatiranje unetog datuma u "MM/YY"
  formatExpirationDate(): string {
    // Uzmite unete vrednosti za mesec i godinu
    const month = this.mounthNumber.trim();
    const year = this.yearNumber.trim();
  
    // Proverite da li su uneti mesec i godina u validnom formatu
    if (/^\d{1,2}$/.test(month) && /^\d{2}$/.test(year)) {
      return `${month}/${year}`;
    } else {
      console.log('Neispravan format datuma');
      return '';
    }
  }
  
}
