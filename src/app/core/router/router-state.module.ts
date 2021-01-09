import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import {
  DefaultRouterStateSerializer,
  routerReducer,
  RouterStateSerializer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

import { NavigationEffects } from './effects/navigation.effects';
import { CustomRouterStateSerializer } from './reducers/custom-router-serializer.reducer';

@NgModule({})
export class RouterStateModule {
  public static forRoot(): ModuleWithProviders<RootRouterStateModule> {
    return {
      ngModule: RootRouterStateModule,
      providers: [
        {
          provide: RouterStateSerializer,
          useClass: CustomRouterStateSerializer,
        }
      ],
    };
  }
}

@NgModule({
  imports: [
    StoreModule.forFeature('router', routerReducer),
    EffectsModule.forFeature([
      NavigationEffects,
    ]),
    StoreRouterConnectingModule.forRoot({ serializer: DefaultRouterStateSerializer, stateKey: 'router' }),
  ]
})
export class RootRouterStateModule {}
