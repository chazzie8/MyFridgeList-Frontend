import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { Item } from 'src/app/shared/models/item.model';
import {
  CreateItem,
  CreateItemSuccess,
  DeleteItem,
  DeleteItemSuccess,
  ItemsApiActionTypes
} from '../actions/items-api.actions';
import { ListItemsApiActionTypes, LoadItems, LoadItemsSuccess } from '../actions/list-items-api.actions';
import { ShoppinglistApiService } from '../services/shoppinglist.service';

@Injectable()
export class ItemsApiEffects {

  @Effect({ dispatch: true })
  public loadItems$ = this.actions$.pipe(
    ofType(ListItemsApiActionTypes.LoadItems),
    switchMap((action: LoadItems) => {
      return this.shoppinglistApiService.getItems(action.shoppinlistId).pipe(
        map((response: Item[]) => new LoadItemsSuccess(response)),
      );
    }),
  );

  @Effect({ dispatch: true })
  public addArticle$ = this.actions$.pipe(
    ofType(ItemsApiActionTypes.CreateItem),
    switchMap((action: CreateItem) => {
      return this.shoppinglistApiService.addItem(action.shoppinglistId, action.addItemRequest).pipe(
        map((response: Item) => {
          this.snackBar.open('Artikel "' + response.label + '" wurde hinzugefügt', 'Schließen', {
            duration: 3000,
          });
          return new CreateItemSuccess(response);
        }),
      );
    }),
  );

  @Effect({ dispatch: true })
  public deleteArticle$ = this.actions$.pipe(
    ofType(ItemsApiActionTypes.DeleteItem),
    switchMap((action: DeleteItem) => {
      return this.shoppinglistApiService.deleteItem(action.shoppinglistId, action.itemId).pipe(
        map(() => {
          this.snackBar.open('Artikel wurde gelöscht', 'Schließen', {
            duration: 3000,
          });
          return new DeleteItemSuccess(action.itemId);
        }),
      );
    }),
  );

  constructor(
    private actions$: Actions,
    private shoppinglistApiService: ShoppinglistApiService,
    private snackBar: MatSnackBar,
  ) { }
}
