import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Item } from 'src/app/shared/models/item.model';

import { ItemsApiActions, ItemsApiActionTypes } from '../actions/items-api.actions';
import { ListItemsApiActions, ListItemsApiActionTypes } from '../actions/list-items-api.actions';

export const itemsAdapter: EntityAdapter<Item> = createEntityAdapter<Item>({});

export interface ItemsState extends EntityState<Item> { }

export const initialState: ItemsState = itemsAdapter.getInitialState({});

export function itemsReducer(
  state = initialState,
  action: ItemsApiActions | ListItemsApiActions,
): ItemsState {
  switch (action.type) {
    case ListItemsApiActionTypes.LoadItemsSuccess:
      return itemsAdapter.setAll(action.items, {
        ...state,
      });

    case ItemsApiActionTypes.CreateItemSuccess:
      return itemsAdapter.upsertOne(action.item, {
        ...state,
      });

    case ItemsApiActionTypes.DeleteItemSuccess:
      return itemsAdapter.removeOne(action.itemId, {
        ...state,
      });

    default:
      return state;
  }
}
