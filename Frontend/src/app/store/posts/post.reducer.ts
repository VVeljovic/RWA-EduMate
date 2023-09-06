import { createReducer, on } from "@ngrx/store";
import * as fromPostActions from "./post.actions";
import { Post } from "src/app/models/post.model";
export interface PostState {
  posts: Post[];
  loading: boolean;
  error: any;
}

export const initialState: PostState = {
  posts: [],
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
  }))
);
