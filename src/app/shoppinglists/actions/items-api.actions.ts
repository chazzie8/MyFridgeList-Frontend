import { Item } from 'src/app/shared/models/item.model';
import { CreateItemRequest } from 'src/app/shared/models/requests/create-item-request.model';

export enum ItemsApiActionTypes {

  CreateItem = '[Shoppinglist] Create Item',
  CreateItemSuccess = '[Shoppinglist] Create Item Success',

  DeleteItem = '[Shoppinglist] Delete Item',
  DeleteItemSuccess = '[Shoppinglist] Delete Item Success',
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

export type ItemsApiActions =
  | CreateItem
  | CreateItemSuccess
  | DeleteItem
  | DeleteItemSuccess
;
