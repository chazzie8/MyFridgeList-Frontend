import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ChartsModule } from 'ng2-charts';

import { environment } from './../environments/environment';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { AuthUIModule } from './auth-ui/auth-ui.module';
import { CoreModule } from './core/core.module';
import { metaReducers, reducers } from './core/router/reducers';
import { FridgesModule } from './fridges/fridges.module';
import { MaterialModule } from './shared/material.module';
import { ShoppinglistsModule } from './shoppinglists/shoppinglists.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {
      enableTracing: false,
      scrollPositionRestoration: 'top',
    }),
    ChartsModule,
    CoreModule,
    FridgesModule.forRoot(),
    ShoppinglistsModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      name: 'MyFridgeList App DevTools',
    }),
    EffectsModule.forRoot(),
    AuthUIModule,
    MaterialModule,
  ],
  providers: [
    { provide: 'apiBaseUrl', useValue: environment.apiBaseUrl },
],
  bootstrap: [AppComponent],
})
export class AppModule { }
