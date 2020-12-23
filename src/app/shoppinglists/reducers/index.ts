import * as items from './items.reducer';
import * as shoppinglists from './shoppinglists.reducer';

export interface ShoppinglistRootState {
  shoppinglists: shoppinglists.ShoppinglistsState;
  items: items.ItemsState;
}

export const reducers = {
  shoppinglists: shoppinglists.shoppinglistsReducer,
  items: items.itemsReducer,
};
