import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from '../models/comment.model';
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http:HttpClient) {
   }
   getComments(idPost:number):Observable<Comment[]>{
    const url = `${environment.api}comments/getComments/${idPost}`;
    return this.http.get<Comment[]>(url);
   }
}
