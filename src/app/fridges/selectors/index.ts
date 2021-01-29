import { createFeatureSelector } from '@ngrx/store';

import { FRIDGES_FEATURE_KEY } from '../definitions/fridges.definitions';
import { FridgeRootState } from '../reducers';

export const getFridgeRootState = createFeatureSelector<FridgeRootState>(FRIDGES_FEATURE_KEY);
