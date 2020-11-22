import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { reducers } from './core/reducers';
import { CustomRouterStateSerializer } from './core/reducers/custom-router-serializer.reducer';
import { MaterialModule } from './shared/material.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    StoreModule.forRoot(reducers, {}),
    StoreDevtoolsModule.instrument({
      name: 'MyFridgeList App DevTools',
    }),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    MaterialModule,
  ],
  providers: [{
    provide: RouterStateSerializer,
    useClass: CustomRouterStateSerializer,
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
