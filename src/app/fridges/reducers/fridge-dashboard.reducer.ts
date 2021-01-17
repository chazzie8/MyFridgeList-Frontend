import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { FridgeDashboardItem } from 'src/app/shared/models/fridge-dashboard-item.model';

import { DashboardItemsApiActions, DashboardItemsApiActionTypes } from '../actions/dashboard-api.actions';

export const fridgeDashboardItemAdapter: EntityAdapter<FridgeDashboardItem> = createEntityAdapter<FridgeDashboardItem>({});

export interface FridgeDashboardState extends EntityState<FridgeDashboardItem> { }

export const initialState: FridgeDashboardState = fridgeDashboardItemAdapter.getInitialState({});

export function fridgeDashboardReducer(
  state = initialState,
  action: DashboardItemsApiActions,
): FridgeDashboardState {
  switch (action.type) {

    case DashboardItemsApiActionTypes.LoadFridgeDashboardItemsSuccess:
      return fridgeDashboardItemAdapter.upsertMany(action.dashboardItems, {
        ...state,
      });

    default:
      return state;
  }
}
