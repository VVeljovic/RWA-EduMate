import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from './auth/auth.reducer';
import * as fromPosts from './posts/post.reducer';
export interface AppState {
  auth: fromAuth.AuthState;
  posts:fromPosts.PostState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  posts:fromPosts.postReducer,
};