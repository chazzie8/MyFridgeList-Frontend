export enum ShoppinglistActionTypes {

  PurgeShoppinglistItems = '[Shoppinglist] Purge Shoppinglist Items',
}

export class PurgeShoppinglistItems {
  readonly type = ShoppinglistActionTypes.PurgeShoppinglistItems;
}

export type ShoppinglistActions =
  | PurgeShoppinglistItems
;
