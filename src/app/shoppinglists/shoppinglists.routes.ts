import { Routes } from '@angular/router';

import { LoggedInGuard } from './../core/auth/guards/logged-in-guard.service';
import { ItemListComponent } from './components/item-list/item-list.component';

export const routes: Routes = [
  {
    path: 'shoppinglists/:shoppinglistId',
    component: ItemListComponent,
    canActivate: [LoggedInGuard],
  },
];
