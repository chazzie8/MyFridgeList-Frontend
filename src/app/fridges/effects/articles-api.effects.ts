import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { Article } from 'src/app/shared/models/article.model';
import { ApiResponse } from 'src/app/shared/models/respones/response.model';

import {
  ArticlesApiActionTypes,
  CreateArticle,
  CreateArticleSuccess,
  DeleteArticle,
  DeleteArticleSuccess,
  UpdateArticle,
  UpdateArticleSuccess,
} from '../actions/articles-api.actions';
import { ListArticlesApiActionTypes, LoadArticles, LoadArticlesSuccess } from '../actions/list-articles-api.actions';
import { FridgeApiService } from '../services/fridge-api.service';

@Injectable()
export class ArticleApiEffects {

  @Effect({ dispatch: true })
  public loadArticles$ = this.actions$.pipe(
    ofType(ListArticlesApiActionTypes.LoadArticles),
    switchMap((action: LoadArticles) => {
      return this.fridgeApiService.getArticles(action.fridgeId).pipe(
        map((response: ApiResponse<Article[]>) => new LoadArticlesSuccess(response.data)),
      );
    }),
  );

  @Effect({ dispatch: true })
  public addArticle$ = this.actions$.pipe(
    ofType(ArticlesApiActionTypes.CreateArticle),
    switchMap((action: CreateArticle) => {
      return this.fridgeApiService.addArticle(action.fridgeId, action.addArticleRequest).pipe(
        map((response: ApiResponse<Article>) => new CreateArticleSuccess(response.data)),
      );
    }),
  );

  @Effect({ dispatch: false })
  public addArticleSuccess$ = this.actions$.pipe(
    ofType(ArticlesApiActionTypes.CreateArticleSuccess),
    tap((action: CreateArticleSuccess) => {
      this.snackBar.open('Artikel "' + action.article.label + '" wurde hinzugefügt', 'Schließen', {
        duration: 3000,
      });
    }),
  );

  @Effect({ dispatch: true })
  public updateArticle$ = this.actions$.pipe(
    ofType(ArticlesApiActionTypes.UpdateArticle),
    switchMap((action: UpdateArticle) => {
      return this.fridgeApiService.updateArticle(action.fridgeId, action.article.id, action.article).pipe(
        map((response: ApiResponse<Article>) => new UpdateArticleSuccess(response.data)),
      );
    }),
  );

  @Effect({ dispatch: false })
  public updateArticleSuccess$ = this.actions$.pipe(
    ofType(ArticlesApiActionTypes.UpdateArticleSuccess),
    tap((action: UpdateArticleSuccess) => {
      this.snackBar.open('Artikel "' + action.article.label + '" wurde geupdated', 'Schließen', {
        duration: 3000,
      });
    }),
  );

  @Effect({ dispatch: true })
  public deleteArticle$ = this.actions$.pipe(
    ofType(ArticlesApiActionTypes.DeleteArticle),
    switchMap((action: DeleteArticle) => {
      return this.fridgeApiService.deleteArticle(action.fridgeId, action.articleId).pipe(
        map(() => {
          this.snackBar.open('Artikel wurde gelöscht', 'Schließen', {
            duration: 3000,
          });
          return new DeleteArticleSuccess(action.articleId);
        }),
      );
    }),
  );

  @Effect({ dispatch: false })
  public deleteArticleSuccess$ = this.actions$.pipe(
    ofType(ArticlesApiActionTypes.DeleteArticleSuccess),
    tap(() => {
      this.snackBar.open('Artikel wurde gelöscht', 'Schließen', {
        duration: 3000,
      });
    }),
  );

  constructor(
    private actions$: Actions,
    private fridgeApiService: FridgeApiService,
    private snackBar: MatSnackBar,
  ) { }
}
