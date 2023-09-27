import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) { }
  public checkout():Observable<any>{
    const cart = {
      name:"Veljko",
      price:333
    }
    return this.http.post<any>(environment.api+'stripe',cart);
   
  }
}
