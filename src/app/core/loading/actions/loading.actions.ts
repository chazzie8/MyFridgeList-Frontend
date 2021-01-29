import { Action } from '@ngrx/store';

export enum LoadingActionTypes {
  SetLoadingStart = '[Loading] Set Loading Start',
  SetLoadingEnd = '[Loading] Set Loading End',
}

export class SetLoadingStart implements Action {

  readonly type = LoadingActionTypes.SetLoadingStart;
}

export class SetLoadingEnd implements Action {

  readonly type = LoadingActionTypes.SetLoadingEnd;
}

export type LoadingActions =
  | SetLoadingStart
  | SetLoadingEnd
;
