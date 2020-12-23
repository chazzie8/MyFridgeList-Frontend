import * as articles from './articles.reducer';
import * as fridges from './fridges.reducer';

export interface FridgeRootState {
  fridges: fridges.FridgesState;
  articles: articles.ArticlesState;
}

export const reducers = {
  fridges: fridges.fridgesReducer,
  articles: articles.articlesReducer,
};
