import { createSelector, MemoizedSelector } from '@ngrx/store';
import { Article } from 'src/app/shared/models/article.model';

import { getFridgeRootState } from '.';
import { articlesAdapter, ArticlesState } from '../reducers/articles.reducer';

const currentDate: Date = new Date();

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
    return articles && articles.filter(article => currentDate >= new Date(article.expirydate));
  }
);

export const getAlmostExpiredArticles = createSelector(
  getArticles,
  (articles: Article[]) => {
    return articles && articles.filter(article => {
      // MHD - jetziges Datum = Tage übrig (kleiner als 3)
      const expiryDate = new Date(article.expirydate);
      const daysLeftMs = expiryDate.getTime() - currentDate.getTime();
      const days = daysLeftMs / 1000 / 60 / 60 / 24;
      return ((days < 4) && (daysLeftMs > 0));
    });
  }
);

export const getShowGoodArticles = createSelector(
  getArticles,
  (articles: Article[]) => {
    return articles && articles.filter(article => {
      // MHD - jetziges Datum = Tage übrig (kleiner als 3)
      const expiryDate = new Date(article.expirydate);
      const daysLeftMs = expiryDate.getTime() - currentDate.getTime();
      const days = daysLeftMs / 1000 / 60 / 60 / 24;
      return ((days > 4) && (daysLeftMs > 0));
    });
  }
);
