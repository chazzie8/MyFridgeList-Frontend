import { CreateShoppinglistRequest } from 'src/app/shared/models/requests/create-shoppinglist-request.model';
import { EditNavTitleRequest } from 'src/app/shared/models/requests/edit-nav-title-request.model';
import { Shoppinglist } from 'src/app/shared/models/shoppinglist.model';

export enum ListShoppinglistsApiActionTypes {

  LoadShoppinglists = '[Shoppinglist] Load Shoppinglists',
  LoadShoppinglistsSuccess = '[Shoppinglist] Load Shoppinglists Success',

  UpdateShoppinglist = '[Shoppinglist] Update Shoppinglist',
  UpdateShoppinglistSuccess = '[Shoppinglist] Update Shoppinglist Success',

  CreateShoppinglist = '[Shoppinglist] Create Shoppinglist',
  CreateShoppinglistSuccess = '[Shoppinglist] Create Shoppinglist Success',

  DeleteShoppinglist = '[Shoppinglist] Delete Shoppinglist',
  DeleteShoppinglistSuccess = '[Shoppinglist] Delete Shoppinglist Success',
}

export class LoadShoppinglists {
  readonly type = ListShoppinglistsApiActionTypes.LoadShoppinglists;
}

export class LoadShoppinglistsSuccess {
  readonly type = ListShoppinglistsApiActionTypes.LoadShoppinglistsSuccess;

  constructor(public shoppinglists: Shoppinglist[]) { }
}

export class UpdateShoppinglist {
  readonly type = ListShoppinglistsApiActionTypes.UpdateShoppinglist;

  constructor(
    public shoppinglistId: string,
    public updateShoppinglistTitle: EditNavTitleRequest
  ) { }
}

export class UpdateShoppinglistSuccess {
  readonly type = ListShoppinglistsApiActionTypes.UpdateShoppinglistSuccess;

  constructor(
    public shoppinglist: Shoppinglist,
  ) { }
}

export class CreateShoppinglist {
  readonly type = ListShoppinglistsApiActionTypes.CreateShoppinglist;

  constructor(
    public shoppinglistRequest: CreateShoppinglistRequest,
  ) { }
}

export class CreateShoppinglistSuccess {
  readonly type = ListShoppinglistsApiActionTypes.CreateShoppinglistSuccess;

  constructor(
    public shoppinglist: Shoppinglist,
  ) { }
}

export class DeleteShoppinglist {
  readonly type = ListShoppinglistsApiActionTypes.DeleteShoppinglist;

  constructor(public shoppinglistId: string) { }
}

export class DeleteShoppinglistSuccess {
  readonly type = ListShoppinglistsApiActionTypes.DeleteShoppinglistSuccess;

  constructor(public shoppinglistId: string) { }
}

export type ListShoppinglistsApiActions =
  | LoadShoppinglists
  | LoadShoppinglistsSuccess
  | UpdateShoppinglist
  | UpdateShoppinglistSuccess
  | CreateShoppinglist
  | CreateShoppinglistSuccess
  | DeleteShoppinglist
  | DeleteShoppinglistSuccess
;
