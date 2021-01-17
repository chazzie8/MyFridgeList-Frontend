import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { Fridge } from 'src/app/shared/models/fridge.model';

import {
  CreateFridge,
  CreateFridgeSuccess,
  ListFridgeApiActionTypes,
  LoadFridges,
  LoadFridgesSuccess,
  UpdateFridge,
  UpdateFridgeSuccess,
} from '../actions/list-fridges-api.actions';
import { FridgeApiService } from '../services/fridge-api.service';
import { GoToDashboard, GoToSelectedFridge } from './../../core/router/actions/navigation.actions';
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
        map((response: Fridge) => {
          this.snackBar.open('Kühlschrank wurde geupdated', 'Schließen', {
            duration: 3000,
          });
          return new UpdateFridgeSuccess(response);
        }),
      );
    }),
  );

  @Effect({ dispatch: true })
  public createFridge$ = this.actions$.pipe(
    ofType(ListFridgeApiActionTypes.CreateFridge),
    switchMap((action: CreateFridge) => {
      return this.fridgeApiService.addFridge(action.fridgeRequest).pipe(
        map((response: Fridge) => new CreateFridgeSuccess(response)),
      );
    }),
  );

  @Effect({ dispatch: true })
  public createFridgeSuccess$ = this.actions$.pipe(
    ofType(ListFridgeApiActionTypes.CreateFridgeSuccess),
    map((action: CreateFridgeSuccess) => {
      this.snackBar.open('Kühlschrank wurde hinzugefügt', 'Schließen', {
        duration: 3000,
      });
      return new GoToSelectedFridge(action.fridge.id);
    }),
  );

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
