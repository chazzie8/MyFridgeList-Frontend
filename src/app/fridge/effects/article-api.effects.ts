import { Injectable } from '@angular/core';
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
        map((response: Article) => new CreateArticleSuccess(response)),
      );
    }),
  );

  @Effect({ dispatch: true })
  public updateArticle$ = this.actions$.pipe(
    ofType(ArticleApiActionTypes.UpdateArticle),
    switchMap((action: UpdateArticle) => {
      return this.articleApiService.updateArticle(action.article.id, action.article).pipe(
        map((response: Article) => new UpdateArticleSuccess(response)),
      );
    }),
  );

  @Effect({ dispatch: true })
  public deleteArticle$ = this.actions$.pipe(
    ofType(ArticleApiActionTypes.DeleteArticle),
    switchMap((action: DeleteArticle) => {
      return this.articleApiService.deleteArticle(action.articleId).pipe(
        map(() => new DeleteArticleSuccess(action.articleId)),
      );
    }),
  );

  constructor(
    private actions$: Actions,
    private articleApiService: ArticleApiService,
  ) { }
}
