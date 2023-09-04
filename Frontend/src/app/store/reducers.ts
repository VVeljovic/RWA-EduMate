import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from './auth/auth.reducer';

export interface AppState {
  auth: fromAuth.AuthState;
  // Dodajte ostale stanja/reducere ovde ako postoje
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  // Dodajte ostale reducere ovde ako postoje
};