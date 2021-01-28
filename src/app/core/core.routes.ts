import { Routes } from '@angular/router';

import { DashboardComponent } from '../fridges/components/dashboard/dashboard.component';
import { LoggedInGuard } from './auth/guards/logged-in-guard.service';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [LoggedInGuard],
  },
];
