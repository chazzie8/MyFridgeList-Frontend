import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { FridgeDashboardItem } from 'src/app/shared/models/fridge-dashboard-item.model';

import { DashboardItemsApiActions, DashboardItemsApiActionTypes } from '../actions/dashboard-api.actions';
import { DashboardActions } from '../actions/dashboard.actions';
import { DashboardActionTypes } from './../actions/dashboard.actions';

export const fridgeDashboardItemAdapter: EntityAdapter<FridgeDashboardItem> = createEntityAdapter<FridgeDashboardItem>({});

export interface FridgeDashboardState extends EntityState<FridgeDashboardItem> { }

export const initialState: FridgeDashboardState = fridgeDashboardItemAdapter.getInitialState({});

export function fridgeDashboardReducer(
  state = initialState,
  action: DashboardItemsApiActions | DashboardActions,
): FridgeDashboardState {
  switch (action.type) {

    case DashboardItemsApiActionTypes.LoadFridgeDashboardItemsSuccess:
      return fridgeDashboardItemAdapter.upsertMany(action.dashboardItems, {
        ...state,
      });

    case DashboardActionTypes.PurgeDashboardFridgeItems:
      return initialState;

    default:
      return state;
  }
}
