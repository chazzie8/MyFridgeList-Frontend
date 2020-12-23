import { Item } from 'src/app/shared/models/item.model';

export enum ListItemsApiActionTypes {

    LoadItems = '[Shoppinglist] Load Items',
    LoadItemsSuccess = '[Shoppinglist] Load Items Success',
}

export class LoadItems {
  readonly type = ListItemsApiActionTypes.LoadItems;

  constructor(public shoppinlistId: string) {}
}

export class LoadItemsSuccess {
  readonly type = ListItemsApiActionTypes.LoadItemsSuccess;

  constructor(public items: Item[]) { }
}

export type ListItemsApiActions =
  | LoadItems
  | LoadItemsSuccess
;
