import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StartComponent } from './core/start/start.component';
import { ArticleListComponent } from './fridges/components/article-list/article-list.component';
import { DashboardComponent } from './fridges/components/dashboard/dashboard.component';
import { ItemListComponent } from './shoppinglists/components/item-list/item-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full',
  },
  {
    path: 'start',
    component: StartComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'fridges/:fridgeId',
    component: ArticleListComponent,
  },
  {
    path: 'shoppinglists/:shoppinglistId',
    component: ItemListComponent,
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
