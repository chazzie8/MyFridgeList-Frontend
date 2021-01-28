import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs/operators';
import { SignUpRequest } from 'src/app/shared/models/requests/sign-up-request.model';

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
        map(() => new SignUpSuccess()),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
  ) {}
}
