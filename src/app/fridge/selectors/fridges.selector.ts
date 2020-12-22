import { Params } from '@angular/router';
import { createSelector, DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';
import { getParams } from 'src/app/core/selectors/router.selector';
import { FRIDGE_ID } from '../fridges.constants';

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

export const getSelectedFridgeId: MemoizedSelector<object, string> = createSelector(
  getParams,
  (params: Params) => params[FRIDGE_ID]
);
