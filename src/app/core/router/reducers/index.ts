import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from 'src/environments/environment';

import { BaseAppState } from './custom-router-serializer.reducer';
import { localStorageSyncReducer } from './middleware/reducers/persist-redux-store';


export const reducers: ActionReducerMap<BaseAppState> = {
  router: fromRouter.routerReducer,
};

export const metaReducers: Array<MetaReducer<BaseAppState>> = !environment.production
  ? [storeFreeze, localStorageSyncReducer]
  : [localStorageSyncReducer];
