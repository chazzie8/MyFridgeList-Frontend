import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as reducer from './reducers/index.reducer';

import { MaterialModule } from '../shared/material.module';
import { ArticleListItemComponent } from './components/article-list-item/article-list-item.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { DialogArticleComponent } from './components/dialog-article/dialog-article.component';
import { ArticleApiEffects } from './effects/article-api.effects';
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
export class FridgeModule {
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
    FridgeModule,
    StoreModule.forFeature('fridges', reducer.reducers),
    EffectsModule.forFeature([ArticleApiEffects]),
  ],
})
export class RootFridgeListModule { }
