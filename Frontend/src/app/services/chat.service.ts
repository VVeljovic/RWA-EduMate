import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import { Observable,of } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { selectAuthToken } from 'src/app/store/auth/auth.selector';
import { Chat } from '../models/chat.model';
@Injectable()
export class ChatService {
    constructor(private socket:Socket,private http:HttpClient,private store:Store)
    {

    }
    sendMessage(text: string,username?:string):void{
      console.log(text,username);
      const data = {text,username};
        this.socket.emit('sendMessage',data);
    }
    getNewMessage():Observable<any>{
      this.socket.fromEvent<any>('newMessage').subscribe(re=>{console.log(re)});
        return this.socket.fromEvent<any>('newMessage');
    }
    getUsersOnSameCourse():Observable<User[]>{
        let token: string | undefined;
    this.store.select(selectAuthToken).subscribe(authToken => {
      if (authToken && authToken.access_token) {
        token = authToken.access_token;
      }
    });
       console.log(token);
       const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
       return this.http.get<User[]>(`${environment.api}user/getUsersOnSameCourse`,{headers});
    }
    getMessages(): Observable<Chat[]> {
      // Slanje zahteva za učitavanje poruka
      this.socket.emit('getMessages');
  
      // Pretplata na odgovor od servera
      return this.socket.fromEvent<Chat[]>('allMessages');
    }
    
}
