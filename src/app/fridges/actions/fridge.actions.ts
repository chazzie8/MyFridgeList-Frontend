export enum FridgeActionTypes {

  PurgeFridgeItems = '[Fridge] Purge Fridge Items',
  PurgeDashboardFridgeItems = '[Dashboard] Purge Dashboard Fridge Items',
}

export class PurgeFridgeItems {
  readonly type = FridgeActionTypes.PurgeFridgeItems;
}

export class PurgeDashboardFridgeItems {
  readonly type = FridgeActionTypes.PurgeDashboardFridgeItems;
}

export type FridgeActions =
  | PurgeFridgeItems
  | PurgeDashboardFridgeItems
;
