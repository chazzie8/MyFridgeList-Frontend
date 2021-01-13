import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { MaterialModule } from '../shared/material.module';
import { DialogItemComponent } from './components/dialog-item/dialog-item.component';
import { ItemListItemComponent } from './components/item-list-item/item-list-item.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemsApiEffects } from './effects/items-api.effects';
import { ShoppinglistsApiEffects } from './effects/shoppinglists-api.effects';
import * as reducer from './reducers';
import { ShoppinglistApiService } from './services/shoppinglist.service';
import { SHOPPINGLISTS_FEATURE_KEY } from './shoppinglists.constants';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    ItemListComponent,
    ItemListItemComponent,
    DialogItemComponent,
  ],
  declarations: [
    ItemListComponent,
    ItemListItemComponent,
    DialogItemComponent,
  ],
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
