import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { BaseAppState } from 'src/app/core/router/reducers/custom-router-serializer.reducer';
import { environment } from 'src/environments/environment';

import { localStorageSyncReducer } from './local-storage-sync.reducer';
import { logoutResetReducer } from './logout-reset.reducer';


export const reducers: ActionReducerMap<BaseAppState> = {
  router: fromRouter.routerReducer,
};

export const metaReducers: Array<MetaReducer<BaseAppState>> = !environment.production
  ? [logoutResetReducer, storeFreeze, localStorageSyncReducer]
  : [logoutResetReducer, localStorageSyncReducer];
