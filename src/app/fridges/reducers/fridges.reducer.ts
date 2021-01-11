import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Fridge } from 'src/app/shared/models/fridge.model';

import { ListFridgeApiActions, ListFridgeApiActionTypes } from '../actions/list-fridges-api.actions';

export const fridgesAdapter: EntityAdapter<Fridge> = createEntityAdapter<Fridge>({});

export interface FridgesState extends EntityState<Fridge> { }

export const initialState: FridgesState = fridgesAdapter.getInitialState({});

export function fridgesReducer(
  state = initialState,
  action: ListFridgeApiActions,
): FridgesState {
  switch (action.type) {
    case ListFridgeApiActionTypes.LoadFridgesSuccess:
      return fridgesAdapter.setAll(action.fridges, {
        ...state,
      });

    case ListFridgeApiActionTypes.DeleteFridgeSuccess:
      return fridgesAdapter.removeOne(action.fridgeId, {
        ...state,
      });

    default:
      return state;
  }
}
