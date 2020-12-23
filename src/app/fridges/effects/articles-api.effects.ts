import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { Article } from 'src/app/shared/models/article.model';

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
        map((response: Article[]) => new LoadArticlesSuccess(response)),
      );
    }),
  );

  @Effect({ dispatch: true })
  public addArticle$ = this.actions$.pipe(
    ofType(ArticlesApiActionTypes.CreateArticle),
    switchMap((action: CreateArticle) => {
      return this.fridgeApiService.addArticle(action.fridgeId, action.addArticleRequest).pipe(
        map((response: Article) => {
          this.snackBar.open('Artikel "' + response.label + '" wurde hinzugefügt', 'Schließen', {
            duration: 3000,
          });
          return new CreateArticleSuccess(response);
        }),
      );
    }),
  );

  @Effect({ dispatch: true })
  public updateArticle$ = this.actions$.pipe(
    ofType(ArticlesApiActionTypes.UpdateArticle),
    switchMap((action: UpdateArticle) => {
      return this.fridgeApiService.updateArticle(action.fridgeId, action.article.id, action.article).pipe(
        map((response: Article) => {
          this.snackBar.open('Artikel "' + response.label + '" wurde geupdated', 'Schließen', {
            duration: 3000,
          });
          return new UpdateArticleSuccess(response);
        }),
      );
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

  constructor(
    private actions$: Actions,
    private fridgeApiService: FridgeApiService,
    private snackBar: MatSnackBar,
  ) { }
}
