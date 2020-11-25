import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArticleListComponent } from './fridge/components/article-list/article-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/fridge',
    pathMatch: 'full',
  },
  {
    path: 'fridge',
    component: ArticleListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
