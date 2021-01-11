import { Fridge } from 'src/app/shared/models/fridge.model';

export enum ListFridgeApiActionTypes {

  LoadFridges = '[Fridge] Load Fridges',
  LoadFridgesSuccess = '[Fridge] Load Fridges Success',

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
  | DeleteFridge
  | DeleteFridgeSuccess
;
