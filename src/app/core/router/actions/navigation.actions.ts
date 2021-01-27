import { Action } from '@ngrx/store';

export enum NavigationActionTypes {
  GoToDashboard = '[Router] Navigate to Dashboard',
  GoToSelectedFridge = '[Router] Navigate to Selected Fridge',
  GoToSelectedShoppinglist = '[Router] Navigate to Selected Shoppinglist',
  GoToLogInScreen = '[Router] Navigate to Log In Screen',
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

export class GoToLogInScreen implements Action {
  readonly type = NavigationActionTypes.GoToLogInScreen;
}


export type NavigationActions =
  | GoToDashboard
  | GoToSelectedFridge
  | GoToSelectedShoppinglist
  | GoToLogInScreen
;
