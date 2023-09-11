import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PostService } from '../../services/post.service';
import * as fromPostActions from './post.actions';
import { Post } from 'src/app/models/post.model';
@Injectable()
export class PostEffects {
  constructor(private actions$: Actions, private postService: PostService) {}

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPostActions.loadPosts),
      switchMap(() =>
        this.postService.getPosts().pipe(
          map((posts) => fromPostActions.loadPostsSuccess({ posts })),
          catchError((error) => of(fromPostActions.loadPostsFailure({ error })))
        )
      )
    )
  );
  createPost$ = createEffect(() =>
  this.actions$.pipe(
    ofType(fromPostActions.createPost),
    switchMap(({ post }) =>
      this.postService.createPost(post.body).pipe(
        map((response) => fromPostActions.createPostSuccess({ post:response })),
        catchError((error) => of(fromPostActions.createPostFailure({ error })))
      )
    )
  )
);
loadPostImage$ = createEffect(() =>
this.actions$.pipe(
  ofType(fromPostActions.loadPostImage),
  switchMap(({ imageName }) =>
    this.postService.getPostImage(imageName).pipe(
      map((imageBlob) => fromPostActions.loadPostImageSuccess({ imageName, imageBlob })),
      catchError((error) => of(fromPostActions.loadPostImageFailure({ imageName, error })))
    )
  )
)
);
}
