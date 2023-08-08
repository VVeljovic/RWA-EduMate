import { Component } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent {

      public posts:Post[]=[];
      constructor(private postService:PostService){
        this.posts=this.postService.getPosts().subscribe((posts: any)=>{
          this.posts = posts;
        });
      }

}
