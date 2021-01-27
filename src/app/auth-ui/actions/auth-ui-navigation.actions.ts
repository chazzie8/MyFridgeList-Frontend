import { Action } from '@ngrx/store';

export enum AuthUINavigationActionTypes {
  GoToSignUp = '[Router] Navigate to Sign Up',
  GoToLogIn = '[Router] Navigate to LogIn',
}

export class GoToSignUp implements Action {
  readonly type = AuthUINavigationActionTypes.GoToSignUp;
}

export class GoToLogIn implements Action {
  readonly type = AuthUINavigationActionTypes.GoToLogIn;
}

export type AuthUINavigationActions =
  | GoToSignUp
  | GoToLogIn
;
