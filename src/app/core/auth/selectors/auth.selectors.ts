import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AUTH_STATE_KEY } from '../definitions/auth.definitions';
import { AuthState } from '../reducers/auth.reducer';
import { decodeToken } from '../utilities/auth-utilities';

export const getAuthState = createFeatureSelector<AuthState>(AUTH_STATE_KEY);

export const getAuthStatus = createSelector(
  getAuthState,
  (state) => state.status,
);

export const isLoggedIn = createSelector(
  getAuthStatus,
  (state) => Boolean(state.token),
);

export const getToken = createSelector(
  getAuthStatus,
  (state) => state.token,
);

export const getDecodedToken = createSelector(
  getToken,
  (token) => (token ? decodeToken(token) : null),
);

export const getUserName = createSelector(
  getAuthStatus,
  (state) => state.userName,
);
