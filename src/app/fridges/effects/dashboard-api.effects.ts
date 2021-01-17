import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { FridgeDashboardItem } from 'src/app/shared/models/fridge-dashboard-item.model';

import { DashboardItemsApiActionTypes, LoadFridgeDashboardItemsSuccess } from '../actions/dashboard-api.actions';
import { FridgeApiService } from './../services/fridge-api.service';

@Injectable()
export class DashboardApiEffects {

  @Effect({ dispatch: true })
  public loadDashbordItems$ = this.actions$.pipe(
    ofType(DashboardItemsApiActionTypes.LoadFridgeDashboardItems),
    switchMap(() => {
      return this.fridgeApiService.getFridgeDashboardItems().pipe(
        map((response: FridgeDashboardItem[]) => new LoadFridgeDashboardItemsSuccess(response)),
      );
    }),
  );

  constructor(
    private actions$: Actions,
    private fridgeApiService: FridgeApiService,
  ) { }
}
