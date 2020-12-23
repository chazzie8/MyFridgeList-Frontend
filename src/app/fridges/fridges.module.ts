import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { MaterialModule } from '../shared/material.module';
import { ArticleListItemComponent } from './components/article-list-item/article-list-item.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { DialogArticleComponent } from './components/dialog-article/dialog-article.component';
import { ArticleApiEffects } from './effects/articles-api.effects';
import { FridgeApiEffects } from './effects/fridges-api.effects';
import { FRIDGES_FEATURE_KEY } from './fridges.constants';
import * as reducer from './reducers';
import { FridgeApiService } from './services/fridge-api.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    ArticleListComponent,
    ArticleListItemComponent,
    DialogArticleComponent,
  ],
  declarations: [
    ArticleListComponent,
    ArticleListItemComponent,
    DialogArticleComponent,
  ],
})
export class FridgesModule {
  static forRoot(): ModuleWithProviders<unknown> {
    return {
      ngModule: RootFridgeListModule,
      providers: [
        FridgeApiService,
      ],
    };
  }
}

@NgModule({
  imports: [
    FridgesModule,
    StoreModule.forFeature(FRIDGES_FEATURE_KEY, reducer.reducers),
    EffectsModule.forFeature([
      ArticleApiEffects,
      FridgeApiEffects,
    ]),
  ],
})
export class RootFridgeListModule { }
