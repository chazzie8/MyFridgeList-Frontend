import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ChartsModule } from 'ng2-charts';

import { MaterialModule } from '../shared/material.module';
import { ArticleListItemComponent } from './components/article-list-item/article-list-item.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { DashboardChartComponent } from './components/dashboard-chart/dashboard-chart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DialogArticleComponent } from './components/dialog-article/dialog-article.component';
import { ArticleApiEffects } from './effects/articles-api.effects';
import { DashboardApiEffects } from './effects/dashboard-api.effects';
import { FridgeApiEffects } from './effects/fridges-api.effects';
import { FRIDGES_FEATURE_KEY } from './fridges.constants';
import { routes } from './fridges.routes';
import * as reducer from './reducers';
import { FridgeApiService } from './services/fridge-api.service';
import { MockFridgeApiService } from './services/mock-fridge-api.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    ChartsModule,
  ],
  exports: [
    ArticleListComponent,
    ArticleListItemComponent,
    DialogArticleComponent,
    DashboardComponent,
    DashboardChartComponent,
  ],
  declarations: [
    ArticleListComponent,
    ArticleListItemComponent,
    DialogArticleComponent,
    DashboardComponent,
    DashboardChartComponent,
  ],
})
export class FridgesModule {
  static forRoot(): ModuleWithProviders<unknown> {
    return {
      ngModule: RootFridgeListModule,
      providers: [
        {
          provide: FridgeApiService,
          // useClass: FridgeApiService,
          useClass: MockFridgeApiService,
        }
      ],
    };
  }
}

@NgModule({
  imports: [
    FridgesModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(FRIDGES_FEATURE_KEY, reducer.reducers),
    EffectsModule.forFeature([
      ArticleApiEffects,
      FridgeApiEffects,
      DashboardApiEffects,
    ]),
  ],
})
export class RootFridgeListModule { }
