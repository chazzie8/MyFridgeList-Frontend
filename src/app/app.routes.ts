import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoggedOutGuard } from './core/auth/guards/logged-out-guard.service';
import { StartComponent } from './core/start/start.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full',
  },
  {
    path: 'start',
    component: StartComponent,
    canActivate: [LoggedOutGuard],
  },
  {
    path: '**',
    redirectTo: 'start',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
