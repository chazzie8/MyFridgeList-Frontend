import { Article } from 'src/app/shared/models/article.model';

export enum ListArticlesApiActionTypes {
  LoadArticles = '[Fridge] Load Articles',
  LoadArticlesSuccess = '[Fridge] Load Articles Success',
}

export class LoadArticles {
  readonly type = ListArticlesApiActionTypes.LoadArticles;

  constructor(public fridgeId: string) {}
}

export class LoadArticlesSuccess {
  readonly type = ListArticlesApiActionTypes.LoadArticlesSuccess;

  constructor(public articles: Article[]) { }
}

export type ListArticlesApiActions =
  | LoadArticles
  | LoadArticlesSuccess
;
