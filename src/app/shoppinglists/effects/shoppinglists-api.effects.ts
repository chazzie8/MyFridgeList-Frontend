import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ShoppinglistApiService } from '../services/shoppinglist.service';
import {
    ListShoppinglistsApiActionTypes,
    LoadShoppinglists,
    LoadShoppinglistsSuccess
} from '../actions/list-shoppinglists-api.actions';
import { map, switchMap } from 'rxjs/operators';
import { Shoppinglist } from 'src/app/shared/models/shoppinglist.model';

@Injectable()
export class ShoppinglistsApiEffects {

  @Effect({ dispatch: true })
  public loadShoppinglist$ = this.actions$.pipe(
    ofType(ListShoppinglistsApiActionTypes.LoadShoppingslists),
    // tslint:disable-next-line:variable-name
    switchMap((_action: LoadShoppinglists) => {
      return this.shoppinglistApiService.getShoppinglists().pipe(
        map((response: Shoppinglist[]) => new LoadShoppinglistsSuccess(response)),
      );
    }),
  );

  constructor(
    private actions$: Actions,
    private shoppinglistApiService: ShoppinglistApiService,
  ) { }

}
