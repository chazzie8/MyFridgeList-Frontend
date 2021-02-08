import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { SignUpRequest } from 'src/app/shared/models/requests/sign-up-request.model';
import { ApiResponse } from 'src/app/shared/models/respones/response.model';

import { ApiError } from '../../actions/api-error.actions';
import { SignUp, SignUpActionTypes, SignUpSuccess } from '../actions/auth-sign-up.actions';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthSignUpEffects {

  @Effect({ dispatch: true })
  signUp$ = this.actions$.pipe(
    ofType(SignUpActionTypes.SignUp),
    map((action: SignUp) => action.payload),
    exhaustMap((signUpRequest: SignUpRequest) =>
      this.authService.signUp(signUpRequest).pipe(
        map((response: ApiResponse<{}>) => {
          if (response.success) {
            return new SignUpSuccess();
          }

          return new ApiError(response);
        }),
        catchError((response: ApiResponse<any>) => of(new ApiError(response)))
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
  ) {}
}
