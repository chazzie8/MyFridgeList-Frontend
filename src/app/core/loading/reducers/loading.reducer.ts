import { LoadingActions, LoadingActionTypes } from '../actions/loading.actions';

export interface LoadingState {
  loading: boolean;
}

export const initialState: LoadingState = {
  loading: false,
};

export function reducer(
  state = initialState,
  action: LoadingActions,
): LoadingState {
  switch (action.type) {
    case LoadingActionTypes.SetLoadingStart: {
      return {
        ...state,
        loading: true,
      };
    }

    case LoadingActionTypes.SetLoadingEnd: {
      return {
        ...state,
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
}
