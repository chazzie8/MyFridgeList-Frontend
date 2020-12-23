import { Fridge } from 'src/app/shared/models/fridge.model';

export enum ListFridgeApiActionTypes {

  LoadFridges = '[Fridge] Load Fridges',
  LoadFridgesSuccess = '[Fridge] Load Fridges Success',
}

export class LoadFridges {
  readonly type = ListFridgeApiActionTypes.LoadFridges;
}

export class LoadFridgesSuccess {
  readonly type = ListFridgeApiActionTypes.LoadFridgesSuccess;

  constructor(public fridges: Fridge[]) { }
}

export type ListFridgeApiActions =
  | LoadFridges
  | LoadFridgesSuccess
;
