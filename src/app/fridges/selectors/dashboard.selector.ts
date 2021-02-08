import { createSelector, MemoizedSelector } from '@ngrx/store';
import { DashboardArticle } from 'src/app/shared/models/dashboard-article.model';

import { getFridgeRootState } from '.';
import { fridgeDashboardArticleAdapter, FridgeDashboardState } from '../reducers/fridge-dashboard.reducer';

export const getFridgeDashboardArticlesState: MemoizedSelector<object, FridgeDashboardState> = createSelector(
  getFridgeRootState,
  (state) => state.fridgeDashboard,
);

export const {
  selectIds: getFridgeDashboardArticleIds,
  selectEntities: getFridgeDashboardArticlesMap,
  selectAll: getFridgeDashboardArticles,
} = fridgeDashboardArticleAdapter.getSelectors(getFridgeDashboardArticlesState);

export const getFridgeDashboardArticleByFridgeId = createSelector(
  getFridgeDashboardArticles,
  // tslint:disable-next-line:max-line-length
  (dashboardArticles: DashboardArticle[], fridgeId: string) => dashboardArticles && dashboardArticles.filter((dashboardArticle: DashboardArticle) => {
    return dashboardArticle.fridgeId === fridgeId;
  })
);
