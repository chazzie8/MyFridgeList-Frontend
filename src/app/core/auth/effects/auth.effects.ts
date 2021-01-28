import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map, tap } from 'rxjs/operators';
import { GoToLogIn } from 'src/app/auth-ui/actions/auth-ui-navigation.actions';
import { LoginRequest } from 'src/app/shared/models/requests/login-request.model';
import { LoginResponse } from 'src/app/shared/models/respones/login-response.model';

import { BaseAppState } from '../../router/reducers/custom-router-serializer.reducer';
import { AuthActionTypes, Login, LoginSuccess, Logout, SessionExpired } from '../actions/auth.actions';
import { AuthService } from '../services/auth.service';
import { DASHBOARD_ROUTER_KEY } from './../../router/definitions/router.definitions';

@Injectable()
export class AuthEffects {

  @Effect()
  login$ = this.actions$.pipe(
    ofType(AuthActionTypes.Login),
    map((action: Login) => action.payload),
    exhaustMap((auth: LoginRequest) =>
      this.authService.login(auth.email, auth.password).pipe(
        map((response: LoginResponse) => new LoginSuccess(response)),
      ),
    ),
  );

  @Effect({ dispatch: false })
  redirectAfterLogin$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginSuccess),
    // tslint:disable-next-line:variable-name
    tap((_action: LoginSuccess) => {
      this.router.navigate([DASHBOARD_ROUTER_KEY]);
    }),
  );

  @Effect({ dispatch : true })
  redirectToLoginAfterSessionExpired$ = this.actions$.pipe(
    ofType(AuthActionTypes.SessionExpired),
    // tslint:disable-next-line:variable-name
    map((_action: SessionExpired) => new GoToLogIn()),
  );

  @Effect({ dispatch : true })
  redirectToLoginAfterLogout$ = this.actions$.pipe(
    ofType(AuthActionTypes.Logout),
    // tslint:disable-next-line:variable-name
    map((_action: Logout) => new GoToLogIn()),
  );

  @Effect({ dispatch : false })
  showMessageAfterSessionExpired$ = this.actions$.pipe(
    ofType(AuthActionTypes.SessionExpired),
    // tslint:disable-next-line:variable-name
    tap((_action: SessionExpired) => {
      this.snackBar.open('Sie wurden ausgeloggt. Session abgelaufen.', 'Schließen', {
        duration: 3000,
      });
    }),
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private store: Store<BaseAppState>,
  ) {}

}
