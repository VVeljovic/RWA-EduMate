import { Component, OnInit } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { Store } from '@ngrx/store';
import { loadPostImage, loadPosts } from 'src/app/store/posts/post.actions';
import { selectPosts } from 'src/app/store/posts/post.selector'; 
import {MatDialog} from '@angular/material/dialog';
import { CommentPopupComponent } from '../comment-popup/comment-popup.component';
import { CommentService } from 'src/app/services/comment.service';
import { selectPostImages } from 'src/app/store/posts/post.selector';
@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss'],
})
export class PostViewComponent implements OnInit {
  public post$: Observable<Post[]>;
  public postImages$: Observable<{ [imageName: string]: Blob }>;
  public images: { [postId: number]: string } = {};

  constructor(private store: Store<{ posts: Post[] , postImages: { [imageName: string]: Blob } }>, private dialogRef:MatDialog) {
    this.post$ = this.store.select(selectPosts);
    this.postImages$ = this.store.select(selectPostImages);
  }

  ngOnInit(): void {
    this.store.dispatch(loadPosts());
    this.post$.subscribe(posts => {
      for (const post of posts) {
        if(post && post.image && !this.images[post.id])
        this.getAndDispatchPostImage(post.image,post.id); 
      }
    });
  }
  openDialog(){
    
  }
  onPostClick(post:Post)
  {
    const postId = post.id;
    this.dialogRef.open(CommentPopupComponent,{data:{postId}});
  }
  getAndDispatchPostImage(imageName: string, postId: number) {
    if(!this.images[postId]){
    this.postImages$.pipe(
      take(1),
      map(postImages => postImages[imageName])
    ).subscribe(imageBlob => {
      if (!imageBlob) {
        this.store.dispatch(loadPostImage({ imageName }));
      } else {
        this.processImageBlob(imageBlob, postId);
      }
    });
  }
  }
  processImageBlob(blobData: Blob, postId: number) {
    const objectURL = URL.createObjectURL(blobData);
    this.images[postId] = objectURL;
  }
  
}
