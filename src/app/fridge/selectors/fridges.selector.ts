import { createSelector, MemoizedSelector } from '@ngrx/store';

import { fridgesAdapter, FridgesState } from '../reducers/fridges.reducer';
import { getFridgeRootState } from './index.selector';

export const getFridgeListState: MemoizedSelector<object, FridgesState> = createSelector(
  getFridgeRootState,
  (state) => state.fridges,
);

export const {
  selectIds: getFridgeIds,
  selectEntities: getFridgesMap,
  selectAll: getFridges,
} = fridgesAdapter.getSelectors(getFridgeListState);
