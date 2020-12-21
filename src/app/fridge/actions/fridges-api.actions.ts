import { Fridge } from "src/app/shared/models/responses/fridge.model";

export enum FridgeApiActionTypes {

  LoadFridges = '[Fridge] Load Fridges',
  LoadFridgesSuccess = '[Fridge] Load Fridges Success',

}

export class LoadFridges {
  readonly type = FridgeApiActionTypes.LoadFridges;
}

export class LoadFridgesSuccess {
  readonly type = FridgeApiActionTypes.LoadFridgesSuccess;

  constructor(public fridges: Fridge[]) { }
}

export type FridgeApiActions =
  | LoadFridges
  | LoadFridgesSuccess
;
