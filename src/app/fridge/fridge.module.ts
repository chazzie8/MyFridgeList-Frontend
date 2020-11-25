import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../shared/material.module';
import { ArticleListItemComponent } from './components/article-list-item/article-list-item.component';

import { ArticleListComponent } from './components/article-list/article-list.component';
import { ArticleApiEffects } from './effects/article-api.effects';
import { articlesReducer } from './reducers/articles.reducer';
import { ArticleApiService } from './services/article-api.service';

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
  ],
  declarations: [
    ArticleListComponent,
    ArticleListItemComponent,
  ],
})
export class FridgeModule {
  static forRoot(): ModuleWithProviders<unknown> {
    return {
      ngModule: RootFridgeListModule,
      providers: [
        ArticleApiService,
      ],
    };
  }
}

@NgModule({
  imports: [
    FridgeModule,
    StoreModule.forFeature('articles', articlesReducer),
    EffectsModule.forFeature([ArticleApiEffects]),
  ],
})
export class RootFridgeListModule { }
