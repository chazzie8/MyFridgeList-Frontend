import { Params } from '@angular/router';
import { Dictionary } from '@ngrx/entity';
import { createSelector, DefaultProjectorFn, MemoizedSelector, MemoizedSelectorWithProps } from '@ngrx/store';
import { getParams } from 'src/app/core/selectors/router.selector';

import { getFridgeRootState } from '.';
import { FRIDGE_ID } from '../fridges.constants';
import { fridgesAdapter, FridgesState } from '../reducers/fridges.reducer';
import { Fridge } from './../../shared/models/fridge.model';

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

export const getSelectedFridge: MemoizedSelector<object, Fridge, DefaultProjectorFn<Fridge>> = createSelector(
  getFridgesMap,
  getSelectedFridgeId,
  (fridges: Dictionary<Fridge>, currentFridgeId: string): Fridge | undefined => fridges && fridges[currentFridgeId],
);

export const getFridgeByFridgeId: MemoizedSelectorWithProps<object, string, Fridge, DefaultProjectorFn<Fridge>> = createSelector(
  getFridgesMap,
  (fridges: Dictionary<Fridge>, fridgeId: string): Fridge | undefined => fridges && fridges[fridgeId],
);
