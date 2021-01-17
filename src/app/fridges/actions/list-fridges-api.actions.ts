import { Fridge } from 'src/app/shared/models/fridge.model';
import { CreateFridgeRequest } from 'src/app/shared/models/requests/create-fridge-request.model';
import { EditNavTitleRequest } from 'src/app/shared/models/requests/edit-nav-title-request.model';

export enum ListFridgeApiActionTypes {

  LoadFridges = '[Fridge] Load Fridges',
  LoadFridgesSuccess = '[Fridge] Load Fridges Success',

  UpdateFridge = '[Fridge] Update Fridge',
  UpdateFridgeSuccess = '[Fridge] Update Fridge Success',

  CreateFridge = '[Fridge] Create Fridge',
  CreateFridgeSuccess = '[Fridge] Create Fridge Success',

  DeleteFridge = '[Fridge] Delete Fridge',
  DeleteFridgeSuccess = '[Fridge] Delete Fridge Success'
}

export class LoadFridges {
  readonly type = ListFridgeApiActionTypes.LoadFridges;
}

export class LoadFridgesSuccess {
  readonly type = ListFridgeApiActionTypes.LoadFridgesSuccess;

  constructor(public fridges: Fridge[]) { }
}

export class UpdateFridge {
  readonly type = ListFridgeApiActionTypes.UpdateFridge;

  constructor(
    public fridgeId: string,
    public updateFridgeTitle: EditNavTitleRequest
  ) { }
}

export class UpdateFridgeSuccess {
  readonly type = ListFridgeApiActionTypes.UpdateFridgeSuccess;

  constructor(
    public fridge: Fridge,
  ) { }
}

export class CreateFridge {
  readonly type = ListFridgeApiActionTypes.CreateFridge;

  constructor(
    public fridgeRequest: CreateFridgeRequest,
  ) { }
}

export class CreateFridgeSuccess {
  readonly type = ListFridgeApiActionTypes.CreateFridgeSuccess;

  constructor(
    public fridge: Fridge,
  ) { }
}

export class DeleteFridge {
  readonly type = ListFridgeApiActionTypes.DeleteFridge;

  constructor(public fridgeId: string) { }
}

export class DeleteFridgeSuccess {
  readonly type = ListFridgeApiActionTypes.DeleteFridgeSuccess;

  constructor(public fridgeId: string) { }
}

export type ListFridgeApiActions =
  | LoadFridges
  | LoadFridgesSuccess
  | UpdateFridge
  | UpdateFridgeSuccess
  | CreateFridge
  | CreateFridgeSuccess
  | DeleteFridge
  | DeleteFridgeSuccess
;
