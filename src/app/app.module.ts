import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { reducers } from './core/reducers';
import { CustomRouterStateSerializer } from './core/reducers/custom-router-serializer.reducer';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    StoreModule.forRoot(reducers, {}),
    StoreDevtoolsModule.instrument({
      name: 'MyFridgeList App DevTools',
    }),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
  ],
  providers: [{
    provide: RouterStateSerializer,
    useClass: CustomRouterStateSerializer,
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
