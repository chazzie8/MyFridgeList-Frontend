import { Article } from 'src/app/shared/models/article.model';

export enum ListArticleApiActionTypes {
  LoadArticles = '[Article] Load Articles',
  LoadArticlesSuccess = '[Article] Load Articles Success',
}

export class LoadArticles {
  readonly type = ListArticleApiActionTypes.LoadArticles;

  constructor(public fridgeId: string) {}
}

export class LoadArticlesSuccess {
  readonly type = ListArticleApiActionTypes.LoadArticlesSuccess;

  constructor(public articles: Article[]) { }
}

export type ListArticleApiActions =
  | LoadArticles
  | LoadArticlesSuccess
;
