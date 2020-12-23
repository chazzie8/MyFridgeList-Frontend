import { createFeatureSelector } from '@ngrx/store';
import { ShoppinglistRootState } from '../reducers';

export const getShoppinglistRootState = createFeatureSelector<ShoppinglistRootState>('shoppinglists');
