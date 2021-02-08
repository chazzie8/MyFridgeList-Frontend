import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { ValidationError } from './../../shared/models/respones/error.model';
import { ApiError, ApiErrorActionTypes } from './../actions/api-error.actions';

@Injectable()
export class ApiErrorEffects {

  @Effect({ dispatch: false })
  handleApiError$ = this.actions$.pipe(
    ofType(ApiErrorActionTypes.ApiError),
    tap((action: ApiError) => {
      // tslint:disable-next-line:no-string-literal
      let errorMessage = action.response.error['error'].message;
      // tslint:disable-next-line:no-string-literal
      const validationErrors = action.response.error['validationErrors'];
      if (Boolean(validationErrors) && validationErrors.length > 0 ) {
        validationErrors.forEach((vError: ValidationError): void => {
          vError.messages.forEach((message: string) => {
            errorMessage = errorMessage + '\n' + message;
          });
        });
      }
      this.snackBar.open(errorMessage, 'Schließen');
    }),
  );

  constructor(
    private actions$: Actions,
    private snackBar: MatSnackBar,
  ) { }
}
