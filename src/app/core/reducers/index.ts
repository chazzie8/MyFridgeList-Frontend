import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

import { BaseAppState } from './custom-router-serializer.reducer';

export const reducers: ActionReducerMap<BaseAppState> = {
  router: fromRouter.routerReducer,
};
