import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { DashboardArticle } from 'src/app/shared/models/dashboard-article.model';

import { DashboardArticlesApiActions, DashboardArticlesApiActionTypes } from '../actions/dashboard-api.actions';
import { DashboardActions } from '../actions/dashboard.actions';
import { DashboardActionTypes } from './../actions/dashboard.actions';

export const fridgeDashboardArticleAdapter: EntityAdapter<DashboardArticle> = createEntityAdapter<DashboardArticle>({});

export interface FridgeDashboardState extends EntityState<DashboardArticle> { }

export const initialState: FridgeDashboardState = fridgeDashboardArticleAdapter.getInitialState({});

export function fridgeDashboardReducer(
  state = initialState,
  action: DashboardArticlesApiActions | DashboardActions,
): FridgeDashboardState {
  switch (action.type) {

    case DashboardArticlesApiActionTypes.LoadFridgeDashboardArticlesSuccess:
      return fridgeDashboardArticleAdapter.upsertMany(action.dashboardArticles, {
        ...state,
      });

    case DashboardActionTypes.PurgeDashboardFridgeArticles:
      return initialState;

    default:
      return state;
  }
}
