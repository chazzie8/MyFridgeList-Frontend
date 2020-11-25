import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Article } from 'src/app/shared/models/article.model';

import { ListArticleApiActions, ListArticleApiActionTypes } from './../actions/list-articles-api.actions';

export const articlesAdapter: EntityAdapter<Article> = createEntityAdapter<Article>({});

export interface ArticlesState extends EntityState<Article> { }

export const initialState: ArticlesState = articlesAdapter.getInitialState({});

export function articlesReducer(
  state = initialState,
  action: ListArticleApiActions,
): ArticlesState {
  switch (action.type) {
    case ListArticleApiActionTypes.LoadArticlesSuccess:
      return articlesAdapter.setAll(action.articles, {
        ...state,
      });

    default:
      return state;
  }
}
