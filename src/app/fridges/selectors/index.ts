import { createFeatureSelector } from '@ngrx/store';
import { FRIDGES_FEATURE_KEY } from '../fridges.constants';
import { FridgeRootState } from '../reducers';

export const getFridgeRootState = createFeatureSelector<FridgeRootState>(FRIDGES_FEATURE_KEY);
