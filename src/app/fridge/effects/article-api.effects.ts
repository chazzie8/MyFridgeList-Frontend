import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { Article } from 'src/app/shared/models/article.model';

import {
  ArticleApiActionTypes,
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
  public updateArticle$ = this.actions$.pipe(
    ofType(ArticleApiActionTypes.UpdateArticle),
    // tslint:disable-next-line:variable-name
    switchMap((action: UpdateArticle) => {
      return this.articleApiService.updateArticle(action.article.id, action.article).pipe(
        map((response: Article) => new UpdateArticleSuccess(response)),
      );
    }),
  );

  @Effect({ dispatch: true })
  public deleteArticle$ = this.actions$.pipe(
    ofType(ArticleApiActionTypes.DeleteArticle),
    // tslint:disable-next-line:variable-name
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
