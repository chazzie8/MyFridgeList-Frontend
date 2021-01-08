import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArticleListComponent } from './fridges/components/article-list/article-list.component';
import { ItemListComponent } from './shoppinglists/components/item-list/item-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/fridges/:fridgeId',
    pathMatch: 'full',
  },
  {
    path: 'fridges/:fridgeId',
    component: ArticleListComponent,
  },
  {
    path: 'shoppinglists/:shoppinglistId',
    component: ItemListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
