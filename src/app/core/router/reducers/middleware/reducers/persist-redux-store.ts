import { ActionReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { SHOPPINGLISTS_FEATURE_KEY } from 'src/app/shoppinglists/shoppinglists.constants';

import { BaseAppState } from '../../custom-router-serializer.reducer';

const STORAGE_KEY_PREFIX = 'myfridgelist_';

class PersistReduxStore implements Storage {
  constructor() {
    this.clearData();
  }

  get length(): number {
    return localStorage.length;
  }

  clearData(): void {
    for (const key in localStorage) {
      if (key.startsWith(STORAGE_KEY_PREFIX)) {
        this.removeItem(key);
      }
    }
  }

  clear(): void {
    return localStorage.clear();
  }

  getItem(key: string): string {
    return localStorage.getItem(key);
  }

  key(index: number): string {
    return localStorage.key(index);
  }

  removeItem(key: string): void {
    return localStorage.removeItem(key);
  }

  setItem(key: string, value: string): void {
    return localStorage.setItem(key, value);
  }
}

export function localStorageSyncReducer(reducer: ActionReducer<BaseAppState>): ActionReducer<BaseAppState> {
  return localStorageSync({
    keys: [
      SHOPPINGLISTS_FEATURE_KEY,
    ],
    storageKeySerializer: (key) => `${STORAGE_KEY_PREFIX}${key}`,
    rehydrate: true,
    storage: new PersistReduxStore(),
  })(reducer);
}
