import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { Fridge } from 'src/app/shared/models/responses/fridge.model';
import { ListFridgeApiActionTypes, LoadFridges, LoadFridgesSuccess } from '../actions/list-fridges-api.actions';
import { FridgeApiService } from '../services/fridge-api.service';

@Injectable()
export class FridgeApiEffects {

  @Effect({ dispatch: true })
  public loadFridges$ = this.actions$.pipe(
    ofType(ListFridgeApiActionTypes.LoadFridges),
    // tslint:disable-next-line:variable-name
    switchMap((_action: LoadFridges) => {
      return this.fridgeApiService.getFridges().pipe(
        map((response: Fridge[]) => new LoadFridgesSuccess(response)),
      );
    }),
  );

  constructor(
    private actions$: Actions,
    private fridgeApiService: FridgeApiService,
  ) { }

}
