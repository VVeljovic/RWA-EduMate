import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import { Observable,of } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { selectAuthToken } from 'src/app/store/auth/auth.selector';
@Injectable()
export class ChatService {
    constructor(private socket:Socket,private http:HttpClient,private store:Store)
    {

    }
    sendMessage(message: string):void{
        this.socket.emit('sendMessage',message);
    }
    getNewMessage():Observable<string>{
        return this.socket.fromEvent<string>('newMessage');
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
}
