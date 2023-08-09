import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent {

      public posts:Observable<Post[]>;
      constructor(private postService:PostService){
       this.posts =  this.postService.getPosts();
       
      }
     
}
