import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as AuthActions from './auth.actions';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: UserService,
    private router : Router
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
              // Preusmeravanje na stranicu za registraciju (ili drugu stranicu po vašem izboru)
              this.router.navigate(['/signUp']); // Promenite '/signup' na odgovarajuću putanju
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
        // Ako je user već postavljen, ne treba ponovo pozivati getUser
        return of(); // Nema emitovanja nove akcije
      } else {
        // Ako user nije postavljen, pozovite getUser
        return this.authService.getUser(authToken).pipe(
          map((user) => AuthActions.loginSuccess({ user, authToken })),
          catchError((error) => of(AuthActions.loginFailure({ error})))
        );
      }
    })
  )
);

}
