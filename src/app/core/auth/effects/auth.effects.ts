import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { exhaustMap, map, tap } from 'rxjs/operators';
import { GoToLogIn } from 'src/app/auth-ui/actions/auth-ui-navigation.actions';
import { LoginRequest } from 'src/app/shared/models/requests/login-request.model';
import { LoginResponse } from 'src/app/shared/models/respones/login-response.model';
import { ApiResponse } from 'src/app/shared/models/respones/response.model';

import { AuthActionTypes, Login, LoginSuccess } from '../actions/auth.actions';
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
        map((response: ApiResponse<LoginResponse>) => new LoginSuccess(response.data)),
      ),
    ),
  );

  @Effect({ dispatch: false })
  redirectAfterLogin$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginSuccess),
    tap(() => {
      this.router.navigate([DASHBOARD_ROUTER_KEY]);
    }),
  );

  @Effect({ dispatch : true })
  redirectToLoginAfterSessionExpired$ = this.actions$.pipe(
    ofType(AuthActionTypes.SessionExpired),
    map(() => new GoToLogIn()),
  );

  @Effect({ dispatch : false })
  showMessageAfterSessionExpired$ = this.actions$.pipe(
    ofType(AuthActionTypes.SessionExpired),
    tap(() => {
      this.snackBar.open('Sie wurden ausgeloggt. Session abgelaufen.', 'Schließen', {
        duration: 5000,
      });
    }),
  );

  @Effect({ dispatch : true })
  redirectToLoginAfterLogout$ = this.actions$.pipe(
    ofType(AuthActionTypes.Logout),
    map(() => new GoToLogIn()),
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) {}

}
