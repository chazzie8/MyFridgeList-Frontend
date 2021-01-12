export enum FridgeActionTypes {

  PurgeFridgeItems = '[Fridge] Purge Fridge Items',
}

export class PurgeFridgeItems {
  readonly type = FridgeActionTypes.PurgeFridgeItems;
}

export type FridgeActions =
  | PurgeFridgeItems
;
