import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { selectAuthToken } from '../store/auth/auth.selector';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http:HttpClient,private store:Store) { 
  }
  authToken$ = this.store.select(selectAuthToken);
  public login(username: string, password: string): Observable<{ access_token: string }> {
    const body = {
      username: username,
      password: password
    };
    console.log(body);
    return this.http.post<{ access_token: string }>(environment.api+"auth/login", body);
  }
  public getUser(tokenObj: { access_token: string }) {
    const extractedToken = tokenObj.access_token;
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${extractedToken}`
    });
    return this.http.get<User>(environment.api+"auth/user", { headers });
  }
  public signUp(name:string, surname: string, course:string, year: number, username:string,email:string,password:string):Observable<{}>
  {
    const body = {
      name:name,
      surname:surname,
      course:course,
      year:year,
      username:username,
      email:email,
      password:password
    }
    console.log(body);
    return this.http.post(environment.api+"user/signUp",body);
  }
  getProfileImage(imageName:string) {
    const requestOptions: Object = { responseType: 'blob' };
    return this.http.get<Blob>(`${environment.api}user/profile-image/${imageName}`, requestOptions);
  }
  changeRole()
  {
    console.log('a');
    let jwtToken :any;
    this.authToken$.subscribe((authToken) => {
      jwtToken = authToken?.access_token;
    });    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwtToken}`,
    });
    console.log(jwtToken);
    this.http.put(environment.api + "user/updateUserRole",{},{ headers }).subscribe((response)=>console.log(response));
  }
  
}
