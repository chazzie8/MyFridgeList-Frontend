import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ApiError } from 'src/app/core/actions/api-error.actions';
import { Item } from 'src/app/shared/models/item.model';
import { ApiResponse } from 'src/app/shared/models/respones/response.model';

import {
  CreateItem,
  CreateItemSuccess,
  DeleteItem,
  DeleteItemSuccess,
  ItemsApiActionTypes,
} from '../actions/items-api.actions';
import { ListItemsApiActionTypes, LoadItems, LoadItemsSuccess } from '../actions/list-items-api.actions';
import { ShoppinglistApiService } from '../services/shoppinglist.service';
import { UpdateBoughtItems, UpdateBoughtItemsSuccess } from './../actions/items-api.actions';

@Injectable()
export class ItemsApiEffects {

  @Effect({ dispatch: true })
  public loadItems$ = this.actions$.pipe(
    ofType(ListItemsApiActionTypes.LoadItems),
    switchMap((action: LoadItems) => {
      return this.shoppinglistApiService.getItems(action.shoppinlistId).pipe(
        map((response: ApiResponse<Item[]>) => {
          if (response.success) {
            return new LoadItemsSuccess(response.data);
          }

          return new ApiError(response);
        }),
        catchError((response: ApiResponse<any>) => of(new ApiError(response)))
      );
    }),
  );

  @Effect({ dispatch: true })
  public addItem$ = this.actions$.pipe(
    ofType(ItemsApiActionTypes.CreateItem),
    switchMap((action: CreateItem) => {
      return this.shoppinglistApiService.addItem(action.shoppinglistId, action.addItemRequest).pipe(
        map((response: ApiResponse<Item>) => {
          if (response.success) {
            return new CreateItemSuccess(response.data);
          }

          return new ApiError(response);
        }),
        catchError((response: ApiResponse<any>) => of(new ApiError(response)))
      );
    }),
  );

  @Effect({ dispatch: false })
  public addItemSuccess$ = this.actions$.pipe(
  ofType(ItemsApiActionTypes.CreateItemSuccess),
    tap(() => {
      this.snackBar.open('Artikel wurde hinzugefügt', 'Schließen', {
        duration: 3000,
      });
    }),
  );

  @Effect({ dispatch: true })
  public deleteItem$ = this.actions$.pipe(
    ofType(ItemsApiActionTypes.DeleteItem),
    switchMap((action: DeleteItem) => {
      return this.shoppinglistApiService.deleteItem(action.shoppinglistId, action.itemId).pipe(
        map((response: ApiResponse<{}>) => {
          if (response.success) {
            return new DeleteItemSuccess(action.itemId);
          }

          return new ApiError(response);
        }),
        catchError((response: ApiResponse<any>) => of(new ApiError(response)))
      );
    }),
  );

  @Effect({ dispatch: false })
  public deleteItemSuccess$ = this.actions$.pipe(
  ofType(ItemsApiActionTypes.DeleteItemSuccess),
    tap(() => {
      this.snackBar.open('Artikel wurde gelöscht', 'Schließen', {
        duration: 3000,
      });
    }),
  );

  @Effect({ dispatch: true })
  public updateItemList$ = this.actions$.pipe(
    ofType(ItemsApiActionTypes.UpdateBoughtItems),
    switchMap((action: UpdateBoughtItems) => {
      return this.shoppinglistApiService.updateBoughtItems(action.shoppinglistId, action.boughtItemIds).pipe(
        map((response: ApiResponse<Item[]>) => {
          if (response.success) {
            return new UpdateBoughtItemsSuccess(response.data);
          }

          return new ApiError(response);
        }),
        catchError((response: ApiResponse<any>) => of(new ApiError(response)))
      );
    }),
  );

  constructor(
    private actions$: Actions,
    private shoppinglistApiService: ShoppinglistApiService,
    private snackBar: MatSnackBar,
  ) { }
}
