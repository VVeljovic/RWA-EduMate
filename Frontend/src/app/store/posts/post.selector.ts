import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostState } from './post.reducer';
import { Post } from 'src/app/models/post.model';
// Kreirajte selektor za deo stanja 'posts'
export const selectPostState = createFeatureSelector<PostState>('posts');

// Kreirajte selektor za niz 'posts'
export const selectPosts = createSelector(
  selectPostState,
  (state: PostState) => state.ids.map((id)=>state.entities[id]).filter((state)=>state!=null).map((state)=><Post>state)
  // Koristi selectAll umesto state.posts
);
export const selectPostImages = createSelector(
  selectPostState,
  (state: PostState) => state.postImages
);


