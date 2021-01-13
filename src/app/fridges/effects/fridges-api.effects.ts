import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { Fridge } from 'src/app/shared/models/fridge.model';

import {
  ListFridgeApiActionTypes,
  LoadFridges,
  LoadFridgesSuccess,
  UpdateFridge,
  UpdateFridgeSuccess,
} from '../actions/list-fridges-api.actions';
import { FridgeApiService } from '../services/fridge-api.service';
import { GoToDashboard } from './../../core/router/actions/navigation.actions';
import { DeleteFridge, DeleteFridgeSuccess } from './../actions/list-fridges-api.actions';

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

  @Effect({ dispatch: true })
  public updateFridge$ = this.actions$.pipe(
    ofType(ListFridgeApiActionTypes.UpdateFridge),
    switchMap((action: UpdateFridge) => {
      return this.fridgeApiService.updateFridge(action.fridgeId, action.updateFridgeTitle).pipe(
        map((response: Fridge) => new UpdateFridgeSuccess(response)),
      );
    }),
  );

  // @Effect({ dispatch: true })
  // public updateFridgeSuccess$ = this.actions$.pipe(
  //   ofType(ListFridgeApiActionTypes.UpdateFridgeSuccess),
  //   map(() => {
  //     this.snackBar.open('Kühlschrank wurde geupdated', 'Schließen', {
  //       duration: 3000,
  //     });
  //   }),
  // );

  @Effect({ dispatch: true })
  public deleteFridge$ = this.actions$.pipe(
    ofType(ListFridgeApiActionTypes.DeleteFridge),
    switchMap((action: DeleteFridge) => {
      return this.fridgeApiService.deleteFridge(action.fridgeId).pipe(
        map(() => new DeleteFridgeSuccess(action.fridgeId)),
      );
    }),
  );

  @Effect({ dispatch: true })
  public deleteFridgeSuccess$ = this.actions$.pipe(
    ofType(ListFridgeApiActionTypes.DeleteFridgeSuccess),
    map(() => {
      this.snackBar.open('Kühlschrank wurde gelöscht', 'Schließen', {
        duration: 3000,
      });
      return new GoToDashboard();
    }),
  );

  constructor(
    private actions$: Actions,
    private fridgeApiService: FridgeApiService,
    private snackBar: MatSnackBar,
  ) { }

}
