import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ApiError } from 'src/app/core/actions/api-error.actions';
import { GoToDashboard, GoToSelectedShoppinglist } from 'src/app/core/router/actions/navigation.actions';
import { ApiResponse } from 'src/app/shared/models/respones/response.model';
import { Shoppinglist } from 'src/app/shared/models/shoppinglist.model';

import {
  CreateShoppinglist,
  CreateShoppinglistSuccess,
  DeleteShoppinglist,
  DeleteShoppinglistSuccess,
  ListShoppinglistsApiActionTypes,
  LoadShoppinglistsSuccess,
  UpdateShoppinglist,
  UpdateShoppinglistSuccess,
} from '../actions/list-shoppinglists-api.actions';
import { ShoppinglistApiService } from '../services/shoppinglist.service';

@Injectable()
export class ShoppinglistsApiEffects {

  @Effect({ dispatch: true })
  public loadShoppinglists$ = this.actions$.pipe(
    ofType(ListShoppinglistsApiActionTypes.LoadShoppinglists),
    switchMap(() => {
      return this.shoppinglistApiService.getShoppinglists().pipe(
        map((response: ApiResponse<Shoppinglist[]>) => {
          if (response.success) {
            return new LoadShoppinglistsSuccess(response.data);
          }

          return new ApiError(response);
        }),
        catchError((response: ApiResponse<any>) => of(new ApiError(response)))
      );
    }),
  );

  @Effect({ dispatch: true })
  public updateShoppinglist$ = this.actions$.pipe(
    ofType(ListShoppinglistsApiActionTypes.UpdateShoppinglist),
    switchMap((action: UpdateShoppinglist) => {
      return this.shoppinglistApiService.updateShoppinglist(action.shoppinglistId, action.updateShoppinglistTitle).pipe(
        map((response: ApiResponse<Shoppinglist>) => {
          if (response.success) {
            return new UpdateShoppinglistSuccess(response.data);
          }

          return new ApiError(response);
        }),
        catchError((response: ApiResponse<any>) => of(new ApiError(response)))
      );
    }),
  );

  @Effect({ dispatch: false })
  public updateShoppinglistSuccess$ = this.actions$.pipe(
    ofType(ListShoppinglistsApiActionTypes.UpdateShoppinglistSuccess),
    tap(() => {
      this.snackBar.open('Einkaufsliste wurde geupdated', 'Schließen', {
        duration: 3000,
      });
    }),
  );

  @Effect({ dispatch: true })
  public createShoppinglist$ = this.actions$.pipe(
    ofType(ListShoppinglistsApiActionTypes.CreateShoppinglist),
    switchMap((action: CreateShoppinglist) => {
      return this.shoppinglistApiService.addShoppinglist(action.shoppinglistRequest).pipe(
        map((response: ApiResponse<Shoppinglist>) => {
          if (response.success) {
            return new CreateShoppinglistSuccess(response.data);
          }

          return new ApiError(response);
        }),
        catchError((response: ApiResponse<any>) => of(new ApiError(response)))
      );
    }),
  );

  @Effect({ dispatch: true })
  public createShoppinglistSuccess$ = this.actions$.pipe(
    ofType(ListShoppinglistsApiActionTypes.CreateShoppinglistSuccess),
    map((action: CreateShoppinglistSuccess) => {
      this.snackBar.open('Einkaufsliste wurde hinzugefügt', 'Schließen', {
        duration: 3000,
      });
      return new GoToSelectedShoppinglist(action.shoppinglist.id);
    })
  );

  @Effect({ dispatch: true })
  public deleteShoppinglist$ = this.actions$.pipe(
    ofType(ListShoppinglistsApiActionTypes.DeleteShoppinglist),
    switchMap((action: DeleteShoppinglist) => {
      return this.shoppinglistApiService.deleteShoppinglist(action.shoppinglistId).pipe(
        map((response: ApiResponse<{}>) => {
          if (response.success) {
            return new DeleteShoppinglistSuccess(action.shoppinglistId);
          }

          return new ApiError(response);
        }),
        catchError((response: ApiResponse<any>) => of(new ApiError(response)))
      );
    }),
  );

  @Effect({ dispatch: true })
  public deleteShoppinglistSuccess$ = this.actions$.pipe(
    ofType(ListShoppinglistsApiActionTypes.DeleteShoppinglistSuccess),
    map(() => {
      this.snackBar.open('Einkaufsliste wurde gelöscht', 'Schließen', {
        duration: 3000,
      });
      return new GoToDashboard();
    })
  );

  constructor(
    private actions$: Actions,
    private shoppinglistApiService: ShoppinglistApiService,
    private snackBar: MatSnackBar,
  ) { }

}
