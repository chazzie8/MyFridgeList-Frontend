import { createSelector, MemoizedSelector } from '@ngrx/store';
import { getShoppinglistRootState } from '.';
import { itemsAdapter, ItemsState } from '../reducers/items.reducer';

export const getItemsListState: MemoizedSelector<object, ItemsState> = createSelector(
  getShoppinglistRootState,
  (state) => state.items,
);

export const {
  selectIds: getItemIds,
  selectEntities: getItemsMap,
  selectAll: getItems,
} = itemsAdapter.getSelectors(getItemsListState);
