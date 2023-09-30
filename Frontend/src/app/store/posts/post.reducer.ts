import { createReducer, on } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import * as fromPostActions from "./post.actions";
import { Post } from "src/app/models/post.model";

// Definišite entitetni adapter za postove
export const postAdapter: EntityAdapter<Post> = createEntityAdapter<Post>();

// Definišite interfejs za PostState sa EntityState<Post>
export interface PostState extends EntityState<Post> {
  postImages: { [imageName: string]: Blob };
  loading: boolean;
  error: any;
}

export const initialState: PostState = postAdapter.getInitialState({
  postImages: {},
  loading: false,
  error: null,
});

export const postReducer = createReducer(
  initialState,
  on(fromPostActions.loadPosts, (state) => ({ ...state, loading: true })),
  on(fromPostActions.loadPostsSuccess, (state, { posts }) => postAdapter.setAll(posts, { ...state, loading: false, error: null })),
  on(fromPostActions.loadPostsFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(fromPostActions.createPost, (state, { post }) => postAdapter.addOne(post, { ...state })),
  on(fromPostActions.createPostSuccess, (state) => ({ ...state, loading: false, error: null })),
  on(fromPostActions.createPostFailure, (state, { error }) => ({ ...state, error })),
  on(fromPostActions.loadPostImageSuccess, (state, { imageName, imageBlob }) => ({ ...state, postImages: { ...state.postImages, [imageName]: imageBlob } })),
  on(fromPostActions.loadFilteredPosts, (state) => ({ ...state, loading: true })),
  on(fromPostActions.loadFilteredPostsSuccess, (state, { posts }) => postAdapter.setAll(posts, { ...state, loading: false, error: null })),
  on(fromPostActions.loadFilteredPostsFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(fromPostActions.uploadPostImage, (state) => ({ ...state, loading: true, error: null })),
  on(fromPostActions.uploadPostImageSuccess, (state, { imageName }) => ({ ...state, loading: false, error: null })),
  on(fromPostActions.uploadPostImageFailure, (state, { error }) => ({ ...state, loading: false, error })),
);
