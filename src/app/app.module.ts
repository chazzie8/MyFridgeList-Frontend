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
import { LoadingModule } from './core/loading/loading.module';
import { metaReducers, reducers } from './core/store/reducers';
import { FridgesModule } from './fridges/fridges.module';
import { SharedModule } from './shared/shared.module';
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
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      name: 'MyFridgeList App DevTools',
    }),
    CoreModule,
    SharedModule,
    LoadingModule,
    AuthUIModule,
    FridgesModule.forRoot(),
    ShoppinglistsModule.forRoot(),
    EffectsModule.forRoot(),
    ChartsModule,
  ],
  providers: [
    {
      provide: 'apiBaseUrl',
      useValue: environment.apiBaseUrl,
    },
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
