import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from './../shared/shared.module';
import { DialogAlertComponent } from './components/dialog-alert/dialog-alert.component';
import { DialogFridgeItemComponent } from './components/dialog-fridge-item/dialog-fridge-item.component';
import { DialogItemComponent } from './components/dialog-item/dialog-item.component';
import { ItemListItemComponent } from './components/item-list-item/item-list-item.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { SHOPPINGLISTS_FEATURE_KEY } from './definitions/shoppinglists.definitions';
import { ItemsApiEffects } from './effects/items-api.effects';
import { ShoppinglistsApiEffects } from './effects/shoppinglists-api.effects';
import * as reducer from './reducers';
import { MockShoppinglistApiService } from './services/mock-shoppinglist.service';
import { ShoppinglistApiService } from './services/shoppinglist.service';
import { routes } from './shoppinglists.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [
    ItemListComponent,
    ItemListItemComponent,
    DialogItemComponent,
    DialogFridgeItemComponent,
    DialogAlertComponent,
  ],
  declarations: [
    ItemListComponent,
    ItemListItemComponent,
    DialogItemComponent,
    DialogFridgeItemComponent,
    DialogAlertComponent,
  ],
})
export class ShoppinglistsModule {
  static forRoot(): ModuleWithProviders<unknown> {
    return {
      ngModule: RootShoppinglistsModule,
      providers: [
        {
          provide: ShoppinglistApiService,
          // useClass: ShoppinglistApiService,
          useClass: MockShoppinglistApiService,
        },
      ],
    };
  }
}

@NgModule({
  imports: [
    ShoppinglistsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(SHOPPINGLISTS_FEATURE_KEY, reducer.reducers),
    EffectsModule.forFeature([
      ItemsApiEffects,
      ShoppinglistsApiEffects,
    ])
  ],
})
export class RootShoppinglistsModule { }
