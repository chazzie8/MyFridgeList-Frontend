import { createSelector, MemoizedSelector } from '@ngrx/store';
import { FridgeDashboardItem } from 'src/app/shared/models/fridge-dashboard-item.model';

import { getFridgeRootState } from '.';
import { fridgeDashboardItemAdapter, FridgeDashboardState } from '../reducers/fridge-dashboard.reducer';

export const getFridgeDashboardItemsState: MemoizedSelector<object, FridgeDashboardState> = createSelector(
  getFridgeRootState,
  (state) => state.fridgeDashboard,
);

export const {
  selectIds: getFridgeDashboardItemIds,
  selectEntities: getFridgeDashboardItemsMap,
  selectAll: getFridgeDashboardItems,
} = fridgeDashboardItemAdapter.getSelectors(getFridgeDashboardItemsState);

export const getFridgeDashboardItemsByFridgeId = createSelector(
  getFridgeDashboardItems,
  (dashboardItems: FridgeDashboardItem[], fridgeId: string) => dashboardItems && dashboardItems.filter((item: FridgeDashboardItem) => {
    return item.fridgeId === fridgeId;
  })
);
