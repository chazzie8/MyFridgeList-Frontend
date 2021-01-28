import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { AuthUINavigationActionTypes } from 'src/app/auth-ui/actions/auth-ui-navigation.actions';
import { AUTH_UI_PATHS } from 'src/app/auth-ui/definitions/auth-ui-navigations.definitions';

import { SignUpActionTypes } from '../../auth/actions/auth-sign-up.actions';
import { BaseAppState } from '../reducers/custom-router-serializer.reducer';

@Injectable()
export class AuthUINavigationEffects {

  @Effect({ dispatch: false })
  public goToSignUp$ = this.actions$.pipe(
    ofType(AuthUINavigationActionTypes.GoToSignUp),
    tap(() => this.router.navigate([AUTH_UI_PATHS.root.signUp])),
  );

  @Effect({ dispatch: false })
  public goToLogIn$ = this.actions$.pipe(
    ofType(AuthUINavigationActionTypes.GoToLogIn),
    tap(() => this.router.navigate([AUTH_UI_PATHS.root.login])),
  );

  @Effect({ dispatch: false })
  public goToSignUpConfirmationScreen$ = this.actions$.pipe(
    ofType(SignUpActionTypes.SignUpSuccess),
    tap(() => this.router.navigate([AUTH_UI_PATHS.root.signUpConfirmation])),
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    public store: Store<BaseAppState>,
    ) { }
}
