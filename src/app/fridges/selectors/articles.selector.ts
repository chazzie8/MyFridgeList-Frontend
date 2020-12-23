import { createSelector, MemoizedSelector } from '@ngrx/store';

import { getFridgeRootState } from '.';
import { articlesAdapter, ArticlesState } from '../reducers/articles.reducer';

export const getArticlesListState: MemoizedSelector<object, ArticlesState> = createSelector(
  getFridgeRootState,
  (state) => state.articles,
);

export const {
  selectIds: getArticleIds,
  selectEntities: getArticlesMap,
  selectAll: getArticles,
} = articlesAdapter.getSelectors(getArticlesListState);
