import { ActionReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { BaseAppState } from 'src/app/core/router/reducers/custom-router-serializer.reducer';
import { SHOPPINGLISTS_FEATURE_KEY } from 'src/app/shoppinglists/definitions/shoppinglists.definitions';

import { AUTH_STATE_KEY } from '../../auth/definitions/auth.definitions';

const STORAGE_KEY_PREFIX = 'myfridgelist_';

export function localStorageSyncReducer(reducer: ActionReducer<BaseAppState>): ActionReducer<BaseAppState> {
  return localStorageSync({
    keys: [
      SHOPPINGLISTS_FEATURE_KEY,
      AUTH_STATE_KEY,
    ],
    storageKeySerializer: (key) => `${STORAGE_KEY_PREFIX}${key}`,
    rehydrate: true,
    storage: localStorage,
  })(reducer);
}
