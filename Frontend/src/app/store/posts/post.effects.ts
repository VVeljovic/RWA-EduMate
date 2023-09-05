import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PostService } from '../../services/post.service';
import * as fromPostActions from './post.actions';

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
}
