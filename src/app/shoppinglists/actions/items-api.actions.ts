import { Item } from 'src/app/shared/models/item.model';
import { CreateItemRequest } from 'src/app/shared/models/requests/create-item-request.model';
import { EditShoppinglistItemRequest } from 'src/app/shared/models/requests/edit-shoppinglist-item-request.model';

export enum ItemsApiActionTypes {

  CreateItem = '[Shoppinglist] Create Item',
  CreateItemSuccess = '[Shoppinglist] Create Item Success',

  DeleteItem = '[Shoppinglist] Delete Item',
  DeleteItemSuccess = '[Shoppinglist] Delete Item Success',

  UpdateBoughtItems = '[Shoppinglist] Update Bought Items',
  UpdateBoughtItemsSuccess = '[Shoppinglist] Update Bought Items Success',
}

export class CreateItem {
  readonly type = ItemsApiActionTypes.CreateItem;

  constructor(
    public shoppinglistId: string,
    public addItemRequest: CreateItemRequest
  ) { }
}

export class CreateItemSuccess {
  readonly type = ItemsApiActionTypes.CreateItemSuccess;

  constructor(public item: Item) { }
}

export class DeleteItem {
  readonly type = ItemsApiActionTypes.DeleteItem;

  constructor(
    public shoppinglistId: string,
    public itemId: string
  ) { }
}

export class DeleteItemSuccess {
  readonly type = ItemsApiActionTypes.DeleteItemSuccess;

  constructor(public itemId: string) { }
}

export class UpdateBoughtItems {
  readonly type = ItemsApiActionTypes.UpdateBoughtItems;

  constructor(
    public shoppinglistId: string,
    public boughtItemIds: EditShoppinglistItemRequest,
  ) { }
}

export class UpdateBoughtItemsSuccess {
  readonly type = ItemsApiActionTypes.UpdateBoughtItemsSuccess;

  constructor(public items: Item[]) { }
}

export type ItemsApiActions =
  | CreateItem
  | CreateItemSuccess
  | DeleteItem
  | DeleteItemSuccess
  | UpdateBoughtItems
  | UpdateBoughtItemsSuccess
;
