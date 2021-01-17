import * as articles from './articles.reducer';
import * as fridgeDashboard from './fridge-dashboard.reducer';
import * as fridges from './fridges.reducer';

export interface FridgeRootState {
  fridges: fridges.FridgesState;
  articles: articles.ArticlesState;
  fridgeDashboard: fridgeDashboard.FridgeDashboardState;
}

export const reducers = {
  fridges: fridges.fridgesReducer,
  articles: articles.articlesReducer,
  fridgeDashboard: fridgeDashboard.fridgeDashboardReducer,
};
