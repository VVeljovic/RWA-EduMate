import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from './auth/auth.reducer';
import * as fromPosts from './posts/post.reducer';
export interface AppState {
  auth: fromAuth.AuthState;
  posts:fromPosts.PostState;
  // Dodajte ostale stanja/reducere ovde ako postoje
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  posts:fromPosts.postReducer
  // Dodajte ostale reducere ovde ako postoje
};