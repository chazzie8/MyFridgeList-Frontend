import * as fromRouter from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { RouterStateUrl } from '../reducers/custom-router-serializer.reducer';

export const selectRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
>('router');

export const getQueryParams = createSelector(
  selectRouterState,
  (routerState) => (routerState ? routerState.state.queryParams || {} : {})
);

export const getParams = createSelector(
  selectRouterState,
  (routerState) =>
    routerState && routerState.state ? routerState.state.params || {} : {}
);

export const getUrl = createSelector(
  selectRouterState,
  (routerState) =>
    routerState && routerState.state ? routerState.state.url || null : null
);

export const getRouterState = createSelector(
  selectRouterState,
  (routerState) =>
    routerState && routerState.state
);

export const getFirstUrlSegment = createSelector(
  selectRouterState,
  (routerState) =>
    routerState && routerState.state
      ? routerState.state.firstUrlSegment || null
      : null
);

export const getLastUrlSegment = createSelector(
  getUrl,
  (url) => !url ? '' : url.split('/').slice(-1)[0]
);
