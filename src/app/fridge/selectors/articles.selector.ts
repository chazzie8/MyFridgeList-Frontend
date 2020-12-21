import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { articlesAdapter, ArticlesState } from '../reducers/articles.reducer';
import { getFridgeRootState } from './index.selector';

export const getArticlesListState: MemoizedSelector<object, ArticlesState> = createSelector(
  getFridgeRootState,
  (state) => state.articles,
);

export const {
  selectIds: getArticleIds,
  selectEntities: getArticlesMap,
  selectAll: getArticles,
} = articlesAdapter.getSelectors(getArticlesListState);
