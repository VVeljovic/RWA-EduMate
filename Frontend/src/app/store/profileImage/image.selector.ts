// user-image.selectors.ts

import { createSelector } from '@ngrx/store';
import { UserImageState } from './image.reducer';

export const selectUserImage = (state: UserImageState) => state.imageBlob;

export const selectUserProfileImage = createSelector(
  selectUserImage,
  (imageBlob) => imageBlob
);
