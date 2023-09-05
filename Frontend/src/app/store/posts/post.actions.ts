import { createAction, props } from "@ngrx/store";
import { Post } from "src/app/models/post.model";

export const loadPosts = createAction('[Post] Load Posts');
export const loadPostsSuccess = createAction('[Post] Load Posts Success', props<{ posts: Post[] }>());
export const loadPostsFailure = createAction('[Post] Load Posts Failure', props<{ error: any }>());
export const createPost = createAction('[Post] Create Post', props<{ content: string}>());


