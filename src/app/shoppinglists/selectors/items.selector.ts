import { createSelector, MemoizedSelector } from '@ngrx/store';
import { Item } from 'src/app/shared/models/item.model';

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

export const getSelectedItemById = createSelector(
  getItems,
  (items: Item[], itemId: string) => items && items.filter(item => item.id === itemId)
);
