import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as AuthActions from './auth.actions';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NotificationPopupComponent } from 'src/app/components/notification-popup/notification-popup.component';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: UserService,
    private dialog:MatDialog
  ) {}

  login$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.loginStart),
    switchMap(({ username, password }) =>
      this.authService.login(username, password).pipe(
        map((authToken) => AuthActions.loginSuccess({ user: null, authToken })),
        catchError((error) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 400 || error.status === 401) {
              this.dialog.open(NotificationPopupComponent, {
                data: { title:'Invalid Credentials',
                      text:'The username or password you entered is incorrect. Please check your credentials and try again.'},
              });
            }
          }
          return of(AuthActions.loginFailure({ error }));
        })
      )
    )
  )
);
  getUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.loginSuccess),
    switchMap(({ authToken, user }) => {
      if (user) {
       
        return of(); 
      } else {
        
        return this.authService.getUser(authToken).pipe(
          map((user) => AuthActions.loginSuccess({ user, authToken })),
          catchError((error) => of(AuthActions.loginFailure({ error})))
        );
      }
    })
  )
);

}
