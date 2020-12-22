import { createSelector, MemoizedSelector } from '@ngrx/store';
import { Article } from 'src/app/shared/models/article.model';

import { articlesAdapter, ArticlesState } from '../reducers/articles.reducer';
import { getFridgeIds, getSelectedFridgeId } from './fridges.selector';
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
