import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from '../models/comment.model';
import { Store } from '@ngrx/store';
import { selectAuthToken } from '../store/auth/auth.selector';
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http:HttpClient, private store : Store) {
   }
   authToken$ = this.store.select(selectAuthToken);
   getComments(idPost:number):Observable<Comment[]>{
    const url = `${environment.api}comments/getComments/${idPost}`;
    return this.http.get<Comment[]>(url);
   }
   createComments(idPost:number,content:string){
    let jwtToken :any;
    this.authToken$.subscribe((authToken) => {
      jwtToken = authToken?.access_token;
    });    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwtToken}`,
    });
    const body = {
      content:content
    }
    const url =`${environment.api}comments/${idPost}`
     this.http.post(url,{content},{headers}).subscribe((response)=>{
      console.log(response);
     })
   }
}
