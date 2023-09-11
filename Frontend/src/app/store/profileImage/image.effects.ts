// user-image.effects.ts

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as UserImageActions from './image.actions';
import { UserService } from 'src/app/services/user.service';
@Injectable()
export class UserImageEffects {
  constructor(
    private actions$: Actions,
    private userImageService: UserService
  ) {}

  loadUserProfileImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserImageActions.loadUserProfileImage),
      switchMap((action) =>
        this.userImageService.getProfileImage(action.imageName).pipe(
          map((imageBlob) =>
            UserImageActions.setUserProfileImage({ imageBlob })
          ),
          catchError((error) => of(/* Handle error action here */))
        )
      )
    )
  );
}
