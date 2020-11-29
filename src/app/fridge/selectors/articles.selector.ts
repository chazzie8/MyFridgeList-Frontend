import { createFeatureSelector, createSelector } from '@ngrx/store';

import { articlesAdapter, ArticlesState } from '../reducers/articles.reducer';

const getArticlesState = createFeatureSelector<ArticlesState>('articles');

export const {
  selectIds: getArticleIds,
  selectEntities: getArticlesMap,
  selectAll: getArticles,
} = articlesAdapter.getSelectors(getArticlesState);

export const getSelectedArticleById = (articleId: string) => createSelector(
  getArticles,
  (articles) => articles[articleId]
);
