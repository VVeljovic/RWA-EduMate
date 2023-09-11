// user-image.reducer.ts

import { createReducer, on } from '@ngrx/store';
import * as UserImageActions from './image.actions';

export interface UserImageState {
  imageBlob: Blob | null;
}

export const initialState: UserImageState = {
  imageBlob: null,
};

export const userImageReducer = createReducer(
  initialState,
  on(UserImageActions.setUserProfileImage, (state, { imageBlob }) => ({
    ...state,
    imageBlob,
  }))
);
