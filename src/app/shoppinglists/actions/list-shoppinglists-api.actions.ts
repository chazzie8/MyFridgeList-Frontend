import { Shoppinglist } from 'src/app/shared/models/shoppinglist.model';

export enum ListShoppinglistsApiActionTypes {

  LoadShoppingslists = '[Shoppingslist] Load Shoppingslists',
  LoadShoppingslistsSuccess = '[Shoppingslist] Load Shoppingslists Success',
}

export class LoadShoppinglists {
  readonly type = ListShoppinglistsApiActionTypes.LoadShoppingslists;
}

export class LoadShoppinglistsSuccess {
  readonly type = ListShoppinglistsApiActionTypes.LoadShoppingslistsSuccess;

  constructor(public shoppingslists: Shoppinglist[]) { }
}

export type ListShoppinglistsApiActions =
  | LoadShoppinglists
  | LoadShoppinglistsSuccess
;
