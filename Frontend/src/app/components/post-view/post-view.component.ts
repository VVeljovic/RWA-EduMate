import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, Subject, concatMap, filter, from, map, take } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { Store } from '@ngrx/store';
import { loadFilteredPosts, loadPostImage, loadPosts } from 'src/app/store/posts/post.actions';
import { selectPosts } from 'src/app/store/posts/post.selector';
import { MatDialog } from '@angular/material/dialog';
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
export class PostViewComponent implements OnInit, OnChanges {
  public post$: Observable<Post[]>;
  public postImages$: Observable<{ [imageName: string]: Blob }>;
  public images: string[] = [];
  selectedImage: string | ArrayBuffer | null = null;
  @Input() selectedFilters!: { course: string; year: number,sort:string};

  constructor(private store: Store<{ posts: Post[]; postImages: { [imageName: string]: Blob } }>, private dialogRef: MatDialog) {
    this.post$ = this.store.select(selectPosts);
    this.postImages$ = this.store.select(selectPostImages);
  }

  ngOnInit(): void {
    this.store.dispatch(loadPosts());
    let imagess : string[] =[];
    let ids : number []=[];
    
    this.post$.subscribe(posts => {
      for (const post of posts) {
        if (post && post.image && !this.images[post.id]) {
          imagess.push(post.image);
          ids.push(post.id);
          console.log(post);
        }
      }
      console.log(imagess);
      this.getAndDispatchPostImages(imagess,ids);
    });
  }

  openDialog() {}

  onPostClick(post: Post) {
    const postId = post.id;
    this.dialogRef.open(CommentPopupComponent, { data: { postId } });
  }

  
  getAndDispatchPostImages(imageNames: string[], postIds: number[]) {
    console.log(imageNames.length);
  
    
    const imageNames$ = from(imageNames);
  
    imageNames$
      .pipe(
        concatMap((imageName, index) => {
          const postId = postIds[index];
          this.store.dispatch(loadPostImage({ imageName }));
  
          return this.postImages$.pipe(
            filter(imageData => !!imageData[imageName]), 
            take(1),
            map(imageData => ({ blobData: imageData[imageName], postId }))
          );
        })
      )
      .subscribe(({ blobData, postId }) => {
        this.processImageBlob(blobData, postId);
      });
  }

  processImageBlob(blobData: Blob, postId: number) {
    const objectURL = URL.createObjectURL(blobData);
    this.images[postId] = objectURL;
    console.log(this.images);
  }

  ngOnChanges(changes: SimpleChanges) {
    const filters: Filters = this.selectedFilters;
    console.log(filters);
    if (filters) this.store.dispatch(loadFilteredPosts({ selectedFilters: filters }));
    
  }

  showSelectedFilters() {
    console.log('Selected Filters:', this.selectedFilters);
  }
 
  
  previewImage(file: File): void {
    console.log('USOOOOOOOOOOOOOOOO');
    const reader = new FileReader();
    reader.readAsDataURL(file);
  
    reader.onload = () => {
      this.selectedImage = reader.result;
    };
  }
}
