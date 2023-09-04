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
  public login(username: string, password: string): Observable<{ access_token: string }> {
    const body = {
      username: username,
      password: password
    };
  
    return this.http.post<{ access_token: string }>(this.loginUrl, body);
  }
  
  public getUser(tokenObj: { access_token: string }) {
    // Izvucite vrednost access_token iz objekta
    const extractedToken = tokenObj.access_token;
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${extractedToken}`
    });
  
    return this.http.get<User>(this.userUrl, { headers });
  }
  
}
