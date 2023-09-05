import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { Store } from '@ngrx/store';
import { loadPosts } from 'src/app/store/posts/post.actions';
import { selectPosts } from 'src/app/store/posts/post.selector'; 

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss'],
})
export class PostViewComponent implements OnInit {
  public post$: Observable<Post[]>;

  constructor(private store: Store<{ posts: Post[] }>) {
    this.post$ = this.store.select(selectPosts);
  }

  ngOnInit(): void {
    this.store.dispatch(loadPosts());
  }
}
