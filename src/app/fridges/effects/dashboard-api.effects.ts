import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { DashboardArticle } from 'src/app/shared/models/dashboard-article.model';
import { ApiResponse } from 'src/app/shared/models/respones/response.model';

import { DashboardArticlesApiActionTypes, LoadFridgeDashboardArticlesSuccess } from '../actions/dashboard-api.actions';
import { FridgeApiService } from './../services/fridge-api.service';

@Injectable()
export class DashboardApiEffects {

  @Effect({ dispatch: true })
  public loadDashbordArticles$ = this.actions$.pipe(
    ofType(DashboardArticlesApiActionTypes.LoadFridgeDashboardArticles),
    switchMap(() => {
      return this.fridgeApiService.getFridgeDashboardArticles().pipe(
        map((response: ApiResponse<DashboardArticle[]>) => new LoadFridgeDashboardArticlesSuccess(response.data)),
      );
    }),
  );

  constructor(
    private actions$: Actions,
    private fridgeApiService: FridgeApiService,
  ) { }
}
