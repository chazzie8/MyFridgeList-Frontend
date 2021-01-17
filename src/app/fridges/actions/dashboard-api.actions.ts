import { FridgeDashboardItem } from 'src/app/shared/models/fridge-dashboard-item.model';

export enum DashboardItemsApiActionTypes {

  LoadFridgeDashboardItems = '[Dashboard] Load Fridge Dashboard Items',
  LoadFridgeDashboardItemsSuccess = '[Dashboard] Load Fridge Dashboard Items Success',
}

export class LoadFridgeDashboardItems {
  readonly type = DashboardItemsApiActionTypes.LoadFridgeDashboardItems;
}

export class LoadFridgeDashboardItemsSuccess {
  readonly type = DashboardItemsApiActionTypes.LoadFridgeDashboardItemsSuccess;

  constructor(public dashboardItems: FridgeDashboardItem[]) {}
}

export type DashboardItemsApiActions =
  | LoadFridgeDashboardItems
  | LoadFridgeDashboardItemsSuccess
;
