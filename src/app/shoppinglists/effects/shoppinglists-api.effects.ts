import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { GoToDashboard } from 'src/app/core/router/actions/navigation.actions';
import { Shoppinglist } from 'src/app/shared/models/shoppinglist.model';

import {
  DeleteShoppinglist,
  DeleteShoppinglistSuccess,
  ListShoppinglistsApiActionTypes,
  LoadShoppinglistsSuccess,
} from '../actions/list-shoppinglists-api.actions';
import { ShoppinglistApiService } from '../services/shoppinglist.service';
import { LoadShoppinglists } from './../actions/list-shoppinglists-api.actions';

@Injectable()
export class ShoppinglistsApiEffects {

  @Effect({ dispatch: true })
  public loadShoppinglists$ = this.actions$.pipe(
    ofType(ListShoppinglistsApiActionTypes.LoadShoppinglists),
    // tslint:disable-next-line:variable-name
    switchMap((_action: LoadShoppinglists) => {
      return this.shoppinglistApiService.getShoppinglists().pipe(
        map((response: Shoppinglist[]) => new LoadShoppinglistsSuccess(response)),
      );
    }),
  );

  @Effect({ dispatch: true })
  public deleteShoppinglist$ = this.actions$.pipe(
    ofType(ListShoppinglistsApiActionTypes.DeleteShoppinglist),
    switchMap((action: DeleteShoppinglist) => {
      return this.shoppinglistApiService.deleteShoppinglist(action.shoppinglistId).pipe(
        map(() => new DeleteShoppinglistSuccess(action.shoppinglistId)),
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
