import { Routes } from '@angular/router';

import { LoggedInGuard } from './../core/auth/guards/logged-in-guard.service';
import { ItemListComponent } from './components/item-list/item-list.component';
import {
  SHOPPINGLIST_ID_ROUTER_PARAM,
  SHOPPINGLISTS_PATH_ELEMENTS,
} from './definitions/shoppinglists-navigations.definitions';

export const routes: Routes = [
  {
    path: `${SHOPPINGLISTS_PATH_ELEMENTS.rootElement}/:${SHOPPINGLIST_ID_ROUTER_PARAM.shoppinglistId}`,
    component: ItemListComponent,
    canActivate: [LoggedInGuard],
  },
];
