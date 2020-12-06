import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { Article } from 'src/app/shared/models/article.model';

import {
  ArticleApiActionTypes,
  CreateArticle,
  CreateArticleSuccess,
  DeleteArticle,
  DeleteArticleSuccess,
  UpdateArticle,
  UpdateArticleSuccess,
} from '../actions/articles-api.actions';
import { ListArticleApiActionTypes, LoadArticles, LoadArticlesSuccess } from '../actions/list-articles-api.actions';
import { ArticleApiService } from '../services/article-api.service';

@Injectable()
export class ArticleApiEffects {

  @Effect({ dispatch: true })
  public loadArticles$ = this.actions$.pipe(
    ofType(ListArticleApiActionTypes.LoadArticles),
    // tslint:disable-next-line:variable-name
    switchMap((_action: LoadArticles) => {
      return this.articleApiService.getArticles().pipe(
        map((response: Article[]) => new LoadArticlesSuccess(response)),
      );
    }),
  );

  @Effect({ dispatch: true })
  public addArticle$ = this.actions$.pipe(
    ofType(ArticleApiActionTypes.CreateArticle),
    switchMap((action: CreateArticle) => {
      return this.articleApiService.addArticle(action.addArticleRequest).pipe(
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
    ofType(ArticleApiActionTypes.UpdateArticle),
    switchMap((action: UpdateArticle) => {
      return this.articleApiService.updateArticle(action.article.id, action.article).pipe(
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
    ofType(ArticleApiActionTypes.DeleteArticle),
    switchMap((action: DeleteArticle) => {
      return this.articleApiService.deleteArticle(action.articleId).pipe(
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
    private articleApiService: ArticleApiService,
    private snackBar: MatSnackBar,
  ) { }
}
