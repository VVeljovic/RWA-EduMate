import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post.model';
import { selectAuthToken } from '../store/auth/auth.selector';
import { Store } from '@ngrx/store';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient,private store:Store) {}
  authToken$ = this.store.select(selectAuthToken);
  public getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(environment.api + "post");
  }
  public createPost(body:string):Observable<Post>{
    let jwtToken :any;
    this.authToken$.subscribe((authToken) => {
      jwtToken = authToken?.access_token;
    });    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwtToken}`,
    });
    // return this.http.post(environment.api+"post", {body}, { headers }).subscribe(
    //   (response) => {
    //     console.log('Uspešno kreiran post:', response);
    //   },
    //   (error) => {
    //     console.error('Greška pri kreiranju posta:', error);
    //   }
    // );
    return this.http.post<Post>(environment.api + "post", { body }, { headers });
  }
  }
  
  

