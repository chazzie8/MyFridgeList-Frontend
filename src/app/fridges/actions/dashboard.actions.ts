export enum DashboardActionTypes {

  PurgeDashboardFridgeItems = '[Dashboard] Purge Dashboard Fridge Items',
}

export class PurgeDashboardFridgeItems {
  readonly type = DashboardActionTypes.PurgeDashboardFridgeItems;
}

export type DashboardActions =
  | PurgeDashboardFridgeItems
;
