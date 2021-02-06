import { createSelector, MemoizedSelector } from '@ngrx/store';
import { Article } from 'src/app/shared/models/article.model';

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

export const getExpiredArticles = createSelector(
  getArticles,
  (articles: Article[]) => {
    return articles && articles.filter(article => article.expirystatus === 'expired');
  }
);

export const getAlmostExpiredArticles = createSelector(
  getArticles,
  (articles: Article[]) => {
    return articles && articles.filter(article => article.expirystatus === 'almostExpired');
  }
);

export const getShowGoodArticles = createSelector(
  getArticles,
  (articles: Article[]) => {
    return articles && articles.filter(article => article.expirystatus === 'good');
  }
);
