import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts :any;
  private readonly postsUrl = 'http://localhost:3000/post';
  constructor(private http:HttpClient) { 
    this.refreshPosts();
  }
  private refreshPosts(){
    this.posts = this.http.get(this.postsUrl);
    return this.posts;
  }
  public getPosts(){
    return this.posts;
  }
}
