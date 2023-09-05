import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostState } from './post.reducer';

// Kreirajte selektor za deo stanja 'posts'
export const selectPostState = createFeatureSelector<PostState>('posts');

// Kreirajte selektor za niz 'posts'
export const selectPosts = createSelector(
  selectPostState,
  (state: PostState) => state.posts
);
