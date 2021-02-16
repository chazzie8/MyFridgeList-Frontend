import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { GoToLogIn } from 'src/app/auth-ui/actions/auth-ui-navigation.actions';
import { LoginRequest } from 'src/app/shared/models/requests/login-request.model';
import { LoginResponse } from 'src/app/shared/models/respones/login-response.model';
import { ApiResponse } from 'src/app/shared/models/respones/response.model';

import { ApiError } from '../../actions/api-error.actions';
import { AuthActionTypes, DeleteUserSuccess, Login, LoginSuccess } from '../actions/auth.actions';
import { AuthService } from '../services/auth.service';
import { GoToSignUp } from './../../../auth-ui/actions/auth-ui-navigation.actions';
import { DASHBOARD_ROUTER_KEY } from './../../router/definitions/router.definitions';

@Injectable()
export class AuthEffects {

  @Effect()
  login$ = this.actions$.pipe(
    ofType(AuthActionTypes.Login),
    map((action: Login) => action.payload),
    exhaustMap((auth: LoginRequest) =>
      this.authService.login(auth.username, auth.email, auth.password).pipe(
        map((response: ApiResponse<LoginResponse>) => {
          if (response.success) {
            return new LoginSuccess(response.data);
          }

          return new ApiError(response);
        }),
        catchError((response: ApiResponse<any>) => of(new ApiError(response)))
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

  @Effect()
  deleteUser$ = this.actions$.pipe(
    ofType(AuthActionTypes.DeleteUser),
    switchMap(() =>
      this.authService.deleteUser().pipe(
        map((response: ApiResponse<{}>) => {
          if (response.success) {
            return new DeleteUserSuccess();
          }

          return new ApiError(response);
        }),
        catchError((response: ApiResponse<any>) => of(new ApiError(response)))
      ),
    ),
  );

  @Effect({ dispatch: true })
  public deleteUserSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.DeleteUserSuccess),
    map(() => {
      this.snackBar.open('Ihr Profil wurde gelöscht. Vielleicht sehen wir uns bald wieder.', 'Schließen', {
        duration: 3000,
      });
      return new GoToSignUp();
    }),
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) {}

}
