import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Fridge } from 'src/app/shared/models/responses/fridge.model';
import { FridgeApiActions, FridgeApiActionTypes } from '../actions/fridges-api.actions';

export const fridgesAdapter: EntityAdapter<Fridge> = createEntityAdapter<Fridge>({});

export interface FridgesState extends EntityState<Fridge> { }

export const initialState: FridgesState = fridgesAdapter.getInitialState({});

export function fridgesReducer(
  state = initialState,
  action: FridgeApiActions,
): FridgesState {
  switch (action.type) {
    case FridgeApiActionTypes.LoadFridgesSuccess:
      return fridgesAdapter.setAll(action.fridges, {
        ...state,
      });

    default:
      return state;
  }
}
