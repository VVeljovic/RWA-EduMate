import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as AuthActions from './auth.actions';
import { UserService } from '../../services/user.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: UserService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginStart),
      switchMap(({ username, password }) =>
        this.authService.login(username, password).pipe(
          map((authToken) => AuthActions.loginSuccess({ user: null, authToken })),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      switchMap(({ authToken }) =>
        this.authService.getUser(authToken).pipe(
          map((user) => AuthActions.loginSuccess({ user, authToken })),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );
}
