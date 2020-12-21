import { createFeatureSelector } from '@ngrx/store';
import { FridgeRootState } from '../reducers/index.reducer';

export const getFridgeRootState = createFeatureSelector<FridgeRootState>('fridge');
