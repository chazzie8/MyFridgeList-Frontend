import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Article } from 'src/app/shared/models/article.model';

import { ArticlesApiActions, ArticlesApiActionTypes } from '../actions/articles-api.actions';
import { FridgeActions, FridgeActionTypes } from '../actions/fridge.actions';
import { ListArticlesApiActions, ListArticlesApiActionTypes } from '../actions/list-articles-api.actions';

export const articlesAdapter: EntityAdapter<Article> = createEntityAdapter<Article>({});

export interface ArticlesState extends EntityState<Article> { }

export const initialState: ArticlesState = articlesAdapter.getInitialState({});

export function articlesReducer(
  state = initialState,
  action: ArticlesApiActions | ListArticlesApiActions | FridgeActions,
): ArticlesState {
  switch (action.type) {
    case ListArticlesApiActionTypes.LoadArticlesSuccess:
      return articlesAdapter.setAll(action.articles, {
        ...state,
      });

    case ArticlesApiActionTypes.CreateArticleSuccess:
    case ArticlesApiActionTypes.UpdateArticleSuccess:
      return articlesAdapter.upsertOne(action.article, {
        ...state,
      });

    case ArticlesApiActionTypes.DeleteArticleSuccess:
      return articlesAdapter.removeOne(action.articleId, {
        ...state,
      });

    case FridgeActionTypes.PurgeFridgeItems:
      return initialState;

    default:
      return state;
  }
}
