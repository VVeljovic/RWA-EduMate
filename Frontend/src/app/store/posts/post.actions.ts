import { createAction, props } from "@ngrx/store";
import { Post } from "src/app/models/post.model";
import { Filters } from "src/app/models/filters.model";
export const loadPosts = createAction('[Post] Load Posts');
export const loadPostsSuccess = createAction('[Post] Load Posts Success', props<{ posts: Post[] }>());
export const loadPostsFailure = createAction('[Post] Load Posts Failure', props<{ error: any }>());
export const createPost = createAction('[Post] Create Post', props<{ post: Post}>());
export const createPostSuccess = createAction('[Post] Create Post Success', props<{ post: Post }>());
export const createPostFailure = createAction('[Post] Create Post Failure', props<{ error: any }>());
export const loadPostImage = createAction(
    '[Post] Load Post Image',
    props<{ imageName: string }>()
  );
  export const loadPostImageSuccess = createAction(
    '[Post] Load Post Image Success',
    props<{ imageName: string, imageBlob: Blob }>()
  );
  export const loadPostImageFailure = createAction(
    '[Post] Load Post Image Failure',
    props<{ imageName: string, error: any }>()
  );
  export const loadFilteredPosts = createAction('[Post] Load FilteredPosts', props<{ selectedFilters: Filters }>());
  export const loadFilteredPostsSuccess = createAction('[Post] Load FilteredPosts Success',props<{ posts: Post[] }>());
  export const loadFilteredPostsFailure = createAction('[Post] Load FilteredPosts', props<{ error: any }>());

