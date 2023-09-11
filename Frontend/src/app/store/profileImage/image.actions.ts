// user-image.actions.ts

import { createAction, props } from '@ngrx/store';

export const loadUserProfileImage = createAction(
  '[User Image] Load User Profile Image',
  props<{ imageName: string }>()
);

export const setUserProfileImage = createAction(
  '[User Image] Set User Profile Image',
  props<{ imageBlob: Blob }>()
);
