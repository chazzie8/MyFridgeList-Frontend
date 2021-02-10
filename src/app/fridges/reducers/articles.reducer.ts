import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Article } from 'src/app/shared/models/article.model';

import { ArticlesApiActions, ArticlesApiActionTypes } from '../actions/articles-api.actions';
import { FridgeActions, FridgeActionTypes } from '../actions/fridge.actions';
import { ListArticlesApiActions, ListArticlesApiActionTypes } from '../actions/list-articles-api.actions';
import { StoreArticle } from './../../shared/models/article.model';

export const articlesAdapter: EntityAdapter<StoreArticle> = createEntityAdapter<StoreArticle>({});

export interface ArticlesState extends EntityState<StoreArticle> { }

export const initialState: ArticlesState = articlesAdapter.getInitialState({});

export function articlesReducer(
  state = initialState,
  action: ArticlesApiActions | ListArticlesApiActions | FridgeActions,
): ArticlesState {
  switch (action.type) {
    case ListArticlesApiActionTypes.LoadArticlesSuccess:
      return handleLoadArticlesSuccess(state, action.articles);

    case ArticlesApiActionTypes.CreateArticleSuccess:
    case ArticlesApiActionTypes.UpdateArticleSuccess:
      return handleCreateOrUpdateArticleSuccess(state, action.article);

    case ArticlesApiActionTypes.DeleteArticleSuccess:
      return articlesAdapter.removeOne(action.articleId, {
        ...state,
      });

    case FridgeActionTypes.PurgeFridgeArticles:
      return initialState;

    default:
      return state;
  }
}

function handleLoadArticlesSuccess(state: ArticlesState, articles: Article[]): ArticlesState {
  const storeArticles = articles.map((article: Article) => {
    const storeArticle: StoreArticle = {
      ...article,
      daysLeft: getDaysLeft(article),
    };

    return storeArticle;
  });
  return articlesAdapter.setAll(storeArticles, {
    ...state,
  });
}

function handleCreateOrUpdateArticleSuccess(state: ArticlesState, article: Article): ArticlesState {
  const storeArticle: StoreArticle = {
    ...article,
    daysLeft: getDaysLeft(article),
  };
  return articlesAdapter.upsertOne(storeArticle, {
    ...state,
  });
}

function getDaysLeft(article: Article): number {
  return (Date.now() - article.expirydate.getUTCMilliseconds()) * 1000 * 60 * 60 * 24;
}
