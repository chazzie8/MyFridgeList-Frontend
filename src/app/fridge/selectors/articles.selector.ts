import { createFeatureSelector } from '@ngrx/store';

import { articlesAdapter, ArticlesState } from '../reducers/articles.reducer';

const getArticlesState = createFeatureSelector<ArticlesState>('articles');

export const {
  selectIds: getArticleIds,
  selectEntities: getArticlesMap,
  selectAll: getArticles,
} = articlesAdapter.getSelectors(getArticlesState);

