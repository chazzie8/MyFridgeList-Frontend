import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AUTH_STATE_KEY } from './definitions/auth.definitions';
import { AuthSignUpEffects } from './effects/auth-sign-up.effects';
import { AuthEffects } from './effects/auth.effects';
import { LoggedInGuard } from './guards/logged-in-guard.service';
import { LoggedOutGuard } from './guards/logged-out-guard.service';
import { AuthTokenInjectorInterceptor } from './interceptors/auth-token-injector.interceptor';
import { AuthTokenInvalidInterceptor } from './interceptors/auth-token-invalid.interceptor';
import { reducer } from './reducers/auth.reducer';
import { AuthService } from './services/auth.service';

@NgModule({
  imports: [
    StoreModule.forFeature(AUTH_STATE_KEY, reducer),
    EffectsModule.forFeature([
      AuthEffects,
      AuthSignUpEffects,
    ]),
  ],
  providers: [
    LoggedInGuard,
    LoggedOutGuard,
    {
      provide: AuthService,
      useClass: AuthService,
      // useClass: MockAuthService,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInjectorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInvalidInterceptor,
      multi: true,
    },
  ],
})
export class AuthModule {}
