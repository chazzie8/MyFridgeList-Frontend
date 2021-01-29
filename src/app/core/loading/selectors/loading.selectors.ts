import { createFeatureSelector, createSelector } from '@ngrx/store';

import { LOADING_STATE_KEY } from '../definitions/loading.definitions';
import { LoadingState } from '../reducers/loading.reducer';

export const getLoadingState = createFeatureSelector<LoadingState>(LOADING_STATE_KEY);

export const getIsLoading = createSelector(
  getLoadingState,
  (state) => state.loading,
);
