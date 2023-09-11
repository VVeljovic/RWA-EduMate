import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from './auth/auth.reducer';
import * as fromPosts from './posts/post.reducer';
import * as fromImages from './profileImage/image.reducer'
export interface AppState {
  auth: fromAuth.AuthState;
  posts:fromPosts.PostState;
  profileImages:fromImages.UserImageState;

  // Dodajte ostale stanja/reducere ovde ako postoje
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  posts:fromPosts.postReducer,
  profileImages:fromImages.userImageReducer
  // Dodajte ostale reducere ovde ako postoje
};