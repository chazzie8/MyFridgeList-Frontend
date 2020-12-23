import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArticleListComponent } from './fridges/components/article-list/article-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/fridges/:fridgeId',
    pathMatch: 'full',
  },
  {
    path: 'fridges/:fridgeId',
    component: ArticleListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
