import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Observable<Post[]> = new Observable<Post[]>();
  private readonly postsUrl = 'http://localhost:3000/post';
  constructor(private http:HttpClient) { 
    this.refreshPosts();
  }
  private refreshPosts():Observable<Post[]>{
    this.posts = this.http.get<Post[]>(this.postsUrl);
    return this.posts;
  }
  public getPosts(){
    return this.posts;
  }
}
