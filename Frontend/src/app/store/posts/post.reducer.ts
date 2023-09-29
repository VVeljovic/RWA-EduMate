import { createReducer, on } from "@ngrx/store";
import * as fromPostActions from "./post.actions";
import { Post } from "src/app/models/post.model";
export interface PostState {
  posts: Post[];
  postImages: { [imageName: string]: Blob };
  loading: boolean;
  error: any;
}

export const initialState: PostState = {
  posts: [],
  postImages: {},
  loading: false,
  error: null,
};

export const postReducer = createReducer(
  initialState,
  on(fromPostActions.loadPosts, (state) => ({ ...state, loading: true })),
  on(fromPostActions.loadPostsSuccess, (state, { posts }) => ({
    ...state,
    posts,
    loading: false,
    error: null,
  })),
  on(fromPostActions.loadPostsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(fromPostActions.createPost, (state, { post }) => ({
    ...state,
    posts: [...state.posts,  post ],
  })),
  on(fromPostActions.createPostFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(fromPostActions.loadPostImageSuccess, (state, { imageName, imageBlob }) => ({
    ...state,
    postImages: { ...state.postImages, [imageName]: imageBlob },
  })),
  on(fromPostActions.loadFilteredPosts, (state) => ({ ...state, loading: true })),
  on(fromPostActions.loadFilteredPostsSuccess, (state, { posts }) => ({
    ...state,
    posts,
    loading: false,
    error: null,
  })),
  
  on(fromPostActions.loadFilteredPostsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(fromPostActions.uploadPostImage, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(fromPostActions.uploadPostImageSuccess, (state, { imageName }) => ({
    ...state,
    loading: false,
    error: null,
    postImages: { ...state.postImages},
  })),
  on(fromPostActions.uploadPostImageFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
