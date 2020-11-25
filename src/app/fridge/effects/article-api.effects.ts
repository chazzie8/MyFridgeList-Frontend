import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { Article } from 'src/app/shared/models/article.model';

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
        map((response: Article[]) => {
          console.log(response);
          return new LoadArticlesSuccess(response);
        }
        ),
      );
    }),
  );

  constructor(
    private actions$: Actions,
    private articleApiService: ArticleApiService,
  ) { }
}
