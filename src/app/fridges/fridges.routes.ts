import { Routes } from '@angular/router';

import { LoggedInGuard } from '../core/auth/guards/logged-in-guard.service';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { FRIDGE_ID_ROUTER_PARAM, FRIDGES_PATH_ELEMENTS } from './definitions/fridges-navigations.defintions';

export const routes: Routes = [
  {
    path: `${FRIDGES_PATH_ELEMENTS.rootElement}/:${FRIDGE_ID_ROUTER_PARAM.fridgeId}`,
    component: ArticleListComponent,
    canActivate: [LoggedInGuard],
  },
];
