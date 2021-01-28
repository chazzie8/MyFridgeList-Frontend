import { Routes } from '@angular/router';

import { LoggedInGuard } from '../core/auth/guards/logged-in-guard.service';
import { ArticleListComponent } from './components/article-list/article-list.component';

export const routes: Routes = [
  {
    path: 'fridges/:fridgeId',
    component: ArticleListComponent,
    canActivate: [LoggedInGuard],
  },
];
