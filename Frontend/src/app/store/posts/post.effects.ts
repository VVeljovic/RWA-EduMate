import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PostService } from '../../services/post.service';
import * as fromPostActions from './post.actions';
import { Post } from 'src/app/models/post.model';
import { MatDialog } from '@angular/material/dialog';
import { NotificationPopupComponent } from 'src/app/components/notification-popup/notification-popup.component';
import { CommentPopupComponent } from 'src/app/components/comment-popup/comment-popup.component';
@Injectable()
export class PostEffects {
  constructor(private actions$: Actions, private postService: PostService,private dialog:MatDialog) {}

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
        map((response) => {
          console.log('Uspešno kreiranje posta', response);
          return fromPostActions.createPostSuccess({ post: response });
        }),
        catchError((error) => {
          console.error('Greška prilikom kreiranja posta', error);
          this.dialog.open(NotificationPopupComponent, {
            data: { title:'Become a Premium',
                  text:'Regular users are allowed only one post per day. Become a premium member'},
          });
          return of(fromPostActions.createPostFailure({ error }));
        })
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
uploadPostImage$ = createEffect(() =>
this.actions$.pipe(
  ofType(fromPostActions.uploadPostImage),
  switchMap(({ image }) =>
    this.postService.uploadImage(image).pipe(
      map((response) => fromPostActions.uploadPostImageSuccess({ imageName:response })),
      catchError((error) => of(fromPostActions.uploadPostImageFailure({ error })))
    )
  )
)
);
loadFilteredPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPostActions.loadFilteredPosts),
      switchMap(({selectedFilters}) =>
        this.postService.getPosts(selectedFilters.course,selectedFilters.year,selectedFilters.sort,selectedFilters.minMark,selectedFilters.maxMark,selectedFilters.sortMarks).pipe(
          map((posts) => fromPostActions.loadPostsSuccess({ posts })),
          catchError((error) => of(fromPostActions.loadPostsFailure({ error })))
        )
      )
    )
  );
}
