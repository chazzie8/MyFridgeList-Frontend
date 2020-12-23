import { ShoppinglistsApiEffects } from './effects/shoppinglists-api.effects';
import { ItemsApiEffects } from './effects/items-api.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../shared/material.module';
import { ShoppinglistApiService } from './services/shoppinglist.service';
import * as reducer from './reducers';
import { SHOPPINGLISTS_FEATURE_KEY } from './shoppinglists.constants';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [],
  declarations: [],
})
export class ShoppinglistsModule {
  static forRoot(): ModuleWithProviders<unknown> {
    return {
      ngModule: RootShoppinglistsModule,
      providers: [
        ShoppinglistApiService,
      ],
    };
  }
}

@NgModule({
  imports: [
    ShoppinglistsModule,
    StoreModule.forFeature(SHOPPINGLISTS_FEATURE_KEY, reducer.reducers),
    EffectsModule.forFeature([
      ItemsApiEffects,
      ShoppinglistsApiEffects,
    ])
  ],
})
export class RootShoppinglistsModule { }
