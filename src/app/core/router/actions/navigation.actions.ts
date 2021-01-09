import { Action } from '@ngrx/store';

export enum NavigationActionTypes {
  GoToDashboard = '[Navigation] GoTo Dashboard',
  GoToSelectedFridge = '[Navigation] GoTo Selected Fridge',
  GoToSelectedShoppinglist = '[Navigation] GoTo Selected Shoppinglist'
}

export class GoToDashboard implements Action {
  readonly type = NavigationActionTypes.GoToDashboard;
}

export class GoToSelectedFridge implements Action {
  readonly type = NavigationActionTypes.GoToSelectedFridge;

  constructor(public fridgeId: string) { }
}

export class GoToSelectedShoppinglist implements Action {
  readonly type = NavigationActionTypes.GoToSelectedShoppinglist;

  constructor(public shoppinglistId: string) { }
}
