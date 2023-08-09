import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly loginUrl = 'http://localhost:3000/auth/login';
  private readonly userUrl = 'http://localhost:3000/auth/user';
  constructor(private http:HttpClient) { 
  }
  public login(username:string,password:string):Observable<string>{
    const body = {
        username:username,
        password:password
    }
     return this.http.post<string>(this.loginUrl,body);
  }
  public getUser(token:string)
  {
       const headers = new HttpHeaders({
        'Authorization':`Bearer ${token}`
    });
    return this.http.get<User>(this.userUrl,{headers});
  }
}
