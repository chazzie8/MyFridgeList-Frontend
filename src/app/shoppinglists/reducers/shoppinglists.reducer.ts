import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Shoppinglist } from 'src/app/shared/models/shoppinglist.model';
import { ListShoppinglistsApiActions, ListShoppinglistsApiActionTypes } from '../actions/list-shoppinglists-api.actions';

export const shoppinglistsAdapter: EntityAdapter<Shoppinglist> = createEntityAdapter<Shoppinglist>({});

export interface ShoppinglistsState extends EntityState<Shoppinglist> { }

export const initialState: ShoppinglistsState = shoppinglistsAdapter.getInitialState({});

export function shoppinglistsReducer(
  state = initialState,
  action: ListShoppinglistsApiActions,
): ShoppinglistsState {
  switch (action.type) {
    case ListShoppinglistsApiActionTypes.LoadShoppingslistsSuccess:
      return shoppinglistsAdapter.setAll(action.shoppingslists, {
        ...state,
      });

    default:
      return state;
  }
}
