import { Component, OnInit,Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { Store } from '@ngrx/store';
import { loadFilteredPosts, loadPostImage, loadPosts } from 'src/app/store/posts/post.actions';
import { selectPosts } from 'src/app/store/posts/post.selector'; 
import {MatDialog} from '@angular/material/dialog';
import { CommentPopupComponent } from '../comment-popup/comment-popup.component';
import { CommentService } from 'src/app/services/comment.service';
import { selectPostImages } from 'src/app/store/posts/post.selector';
import { FiltersComponent } from '../filters/filters.component';
import { Filters } from 'src/app/models/filters.model';
@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss'],
})
export class PostViewComponent implements OnInit ,OnChanges{
  public post$: Observable<Post[]>;
  public postImages$: Observable<{ [imageName: string]: Blob }>;
  public images: { [postId: number]: string } = {};
  @Input() selectedFilters!:{course:string,year:number};
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
      console.log(post);
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
  ngOnChanges(changes: SimpleChanges) {
      const filters : Filters = this.selectedFilters;
      console.log(filters);
      if(filters)
      this.store.dispatch(loadFilteredPosts({selectedFilters:filters}));
     
  }

  showSelectedFilters() {
    console.log('Selected Filters:', this.selectedFilters);
  }
}
