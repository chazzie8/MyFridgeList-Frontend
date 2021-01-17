import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ChartsModule } from 'ng2-charts';

import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { metaReducers, reducers } from './core/router/reducers';
import { CustomRouterStateSerializer } from './core/router/reducers/custom-router-serializer.reducer';
import { FridgesModule } from './fridges/fridges.module';
import {
  CreateRenameListModalComponent,
} from './shared/components/create-rename-list-modal/create-rename-list-modal.component';
import { MaterialModule } from './shared/material.module';
import { ShoppinglistsModule } from './shoppinglists/shoppinglists.module';

@NgModule({
  declarations: [
    AppComponent,
    CreateRenameListModalComponent,
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ChartsModule,
    CoreModule,
    FridgesModule,
    FridgesModule.forRoot(),
    ShoppinglistsModule,
    ShoppinglistsModule.forRoot(),
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      name: 'MyFridgeList App DevTools',
    }),
    EffectsModule.forRoot(),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    MaterialModule,
  ],
  exports: [
    CreateRenameListModalComponent,
  ],
  providers: [
    {
      provide: RouterStateSerializer,
      useClass: CustomRouterStateSerializer,
    },
    {
      provide: 'apiBaseUrl',
      useValue: environment.apiBaseUrl
    },
],
  bootstrap: [AppComponent],
})
export class AppModule { }
