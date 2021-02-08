import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ApiError } from 'src/app/core/actions/api-error.actions';
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
        map((response: ApiResponse<DashboardArticle[]>) => {
          if (response.success) {
            return new LoadFridgeDashboardArticlesSuccess(response.data);
          }

          return new ApiError(response);
        }),
        catchError((response: ApiResponse<any>) => of(new ApiError(response)))
      );
    }),
  );

  constructor(
    private actions$: Actions,
    private fridgeApiService: FridgeApiService,
  ) { }
}
