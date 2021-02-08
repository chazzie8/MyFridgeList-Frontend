export enum DashboardActionTypes {

  PurgeDashboardFridgeArticles = '[Dashboard] Purge Dashboard Fridge Articles',
}

export class PurgeDashboardFridgeArticles {
  readonly type = DashboardActionTypes.PurgeDashboardFridgeArticles;
}

export type DashboardActions =
  | PurgeDashboardFridgeArticles
;
