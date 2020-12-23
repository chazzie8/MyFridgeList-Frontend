import { Params } from '@angular/router';
import { createSelector, DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';
import { getParams } from 'src/app/core/selectors/router.selector';
import { getShoppinglistRootState } from '.';
import { shoppinglistsAdapter, ShoppinglistsState } from '../reducers/shoppinglists.reducer';
import { SHOPPINGLIST_ID } from '../shoppinglists.constants';

export const getShoppinglistListState: MemoizedSelector<object, ShoppinglistsState> = createSelector(
  getShoppinglistRootState,
  (state) => state.shoppinglists,
);

export const {
  selectIds: getShoppinglistIds,
  selectEntities: getShoppinglistsMap,
  selectAll: getShoppinglists,
} = shoppinglistsAdapter.getSelectors(getShoppinglistListState);

export const getSelectedShoppinglistId: MemoizedSelector<object, string> = createSelector(
  getParams,
  (params: Params) => params[SHOPPINGLIST_ID]
);
