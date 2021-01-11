import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './core/dashboard/dashboard.component';
import { ArticleListComponent } from './fridges/components/article-list/article-list.component';
import { ItemListComponent } from './shoppinglists/components/item-list/item-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
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
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
