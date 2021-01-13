import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Shoppinglist } from 'src/app/shared/models/shoppinglist.model';

import { ListShoppinglistsApiActions } from '../actions/list-shoppinglists-api.actions';
import { ListShoppinglistsApiActionTypes } from './../actions/list-shoppinglists-api.actions';

export const shoppinglistsAdapter: EntityAdapter<Shoppinglist> = createEntityAdapter<Shoppinglist>({});

export interface ShoppinglistsState extends EntityState<Shoppinglist> { }

export const initialState: ShoppinglistsState = shoppinglistsAdapter.getInitialState({});

export function shoppinglistsReducer(
  state = initialState,
  action: ListShoppinglistsApiActions,
): ShoppinglistsState {
  switch (action.type) {
    case ListShoppinglistsApiActionTypes.LoadShoppinglistsSuccess:
      return shoppinglistsAdapter.setAll(action.shoppinglists, {
        ...state,
      });

    case ListShoppinglistsApiActionTypes.UpdateShoppinglistSuccess:
      return shoppinglistsAdapter.upsertOne(action.shoppinglist, {
        ...state,
      });

    case ListShoppinglistsApiActionTypes.DeleteShoppinglistSuccess:
      return shoppinglistsAdapter.removeOne(action.shoppinglistId, {
        ...state,
      });

    default:
      return state;
  }
}
