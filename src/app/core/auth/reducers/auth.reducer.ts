import { AuthActions, AuthActionTypes } from '../actions/auth.actions';

export interface AuthState {
  status: AuthStatus;
}

export interface AuthStatus {
  token: string | undefined;
  userName: string | undefined;
}

export const initialState: AuthState = {
  status: {
    token: undefined,
    userName: undefined,
  },
};

export function reducer(
  state = initialState,
  action: AuthActions,
): AuthState {
  switch (action.type) {
    case AuthActionTypes.LoginSuccess: {
      return {
        ...state,
        status: {
          ...state.status,
          token: action.loginResponse.token,
          userName: action.loginResponse.username,
        },
      };
    }

    case AuthActionTypes.Logout:
    case AuthActionTypes.SessionExpired: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}
