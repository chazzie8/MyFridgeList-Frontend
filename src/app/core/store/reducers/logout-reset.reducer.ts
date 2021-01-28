import { Action, ActionReducer } from '@ngrx/store';
import { BaseAppState } from 'src/app/core/router/reducers/custom-router-serializer.reducer';

import { AuthActionTypes } from '../../auth/actions/auth.actions';

export function logoutResetReducer(reducer: ActionReducer<BaseAppState>): any{
  // tslint:disable-next-line:only-arrow-functions
  return function(state: BaseAppState, action: Action): any {
    const isLogout =
      action.type === AuthActionTypes.Logout ||
      action.type === AuthActionTypes.SessionExpired;

    const nextState = isLogout ? undefined : state;
    return reducer(nextState, action);
  };
}
