import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { ListArticlesApiActionTypes } from 'src/app/fridges/actions/list-articles-api.actions';

import { ArticlesApiActionTypes } from './../../../fridges/actions/articles-api.actions';
import { DashboardArticlesApiActionTypes } from './../../../fridges/actions/dashboard-api.actions';
import { ListFridgeApiActionTypes } from './../../../fridges/actions/list-fridges-api.actions';
import { ItemsApiActionTypes } from './../../../shoppinglists/actions/items-api.actions';
import { ListItemsApiActionTypes } from './../../../shoppinglists/actions/list-items-api.actions';
import { ListShoppinglistsApiActionTypes } from './../../../shoppinglists/actions/list-shoppinglists-api.actions';
import { ApiErrorActionTypes } from './../../actions/api-error.actions';
import { SetLoadingEnd, SetLoadingStart } from './../actions/loading.actions';

@Injectable()
export class LoadingEffects {

  @Effect({ dispatch: true })
  public loadingStart$ = this.actions$.pipe(
    ofType(
      ListArticlesApiActionTypes.LoadArticles,
      ArticlesApiActionTypes.CreateArticle,
      ArticlesApiActionTypes.DeleteArticle,
      ArticlesApiActionTypes.UpdateArticle,
      DashboardArticlesApiActionTypes.LoadFridgeDashboardArticles,
      ItemsApiActionTypes.CreateItem,
      ItemsApiActionTypes.DeleteItem,
      ItemsApiActionTypes.UpdateBoughtItems,
      ListItemsApiActionTypes.LoadItems,
      ListFridgeApiActionTypes.CreateFridge,
      ListFridgeApiActionTypes.DeleteFridge,
      ListFridgeApiActionTypes.LoadFridges,
      ListFridgeApiActionTypes.UpdateFridge,
      ListShoppinglistsApiActionTypes.CreateShoppinglist,
      ListShoppinglistsApiActionTypes.DeleteShoppinglist,
      ListShoppinglistsApiActionTypes.LoadShoppinglists,
      ListShoppinglistsApiActionTypes.UpdateShoppinglist,
    ),
    map(() => new SetLoadingStart()),
  );

  @Effect({ dispatch: true })
  public loadingEnd$ = this.actions$.pipe(
    ofType(
      ListArticlesApiActionTypes.LoadArticlesSuccess,
      ArticlesApiActionTypes.CreateArticleSuccess,
      ArticlesApiActionTypes.DeleteArticleSuccess,
      ArticlesApiActionTypes.UpdateArticleSuccess,
      DashboardArticlesApiActionTypes.LoadFridgeDashboardArticlesSuccess,
      ItemsApiActionTypes.CreateItemSuccess,
      ItemsApiActionTypes.DeleteItemSuccess,
      ItemsApiActionTypes.UpdateBoughtItemsSuccess,
      ListItemsApiActionTypes.LoadItemsSuccess,
      ListFridgeApiActionTypes.CreateFridgeSuccess,
      ListFridgeApiActionTypes.DeleteFridgeSuccess,
      ListFridgeApiActionTypes.LoadFridgesSuccess,
      ListFridgeApiActionTypes.UpdateFridgeSuccess,
      ListShoppinglistsApiActionTypes.CreateShoppinglistSuccess,
      ListShoppinglistsApiActionTypes.DeleteShoppinglistSuccess,
      ListShoppinglistsApiActionTypes.LoadShoppinglistsSuccess,
      ListShoppinglistsApiActionTypes.UpdateShoppinglistSuccess,
      ApiErrorActionTypes.ApiError,
    ),
    map(() => new SetLoadingEnd()),
  );

  constructor(
    private actions$: Actions,
  ) { }
}
