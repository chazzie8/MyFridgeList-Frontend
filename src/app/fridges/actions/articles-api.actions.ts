import { Article } from 'src/app/shared/models/article.model';
import { CreateArticleRequest } from 'src/app/shared/models/requests/create-article-request.model';

export enum ArticlesApiActionTypes {

  CreateArticle = '[Fridge] Create Article',
  CreateArticleSuccess = '[Fridge] Create Article Success',

  UpdateArticle = '[Fridge] Update Article',
  UpdateArticleSuccess = '[Fridge] Update Article Success',

  DeleteArticle = '[Fridge] Delete Article',
  DeleteArticleSuccess = '[Fridge] Delete Article Success',
}

export class CreateArticle {
  readonly type = ArticlesApiActionTypes.CreateArticle;

  constructor(
    public fridgeId: string,
    public addArticleRequest: CreateArticleRequest
  ) { }
}

export class CreateArticleSuccess {
  readonly type = ArticlesApiActionTypes.CreateArticleSuccess;

  constructor(public article: Article) { }
}

export class UpdateArticle {
  readonly type = ArticlesApiActionTypes.UpdateArticle;

  constructor(
    public fridgeId: string,
    public article: Article
  ) { }
}

export class UpdateArticleSuccess {
  readonly type = ArticlesApiActionTypes.UpdateArticleSuccess;

  constructor(public article: Article) { }
}

export class DeleteArticle {
  readonly type = ArticlesApiActionTypes.DeleteArticle;

  constructor(
    public fridgeId: string,
    public articleId: string
  ) { }
}

export class DeleteArticleSuccess {
  readonly type = ArticlesApiActionTypes.DeleteArticleSuccess;

  constructor(public articleId: string) { }
}

export type ArticlesApiActions =
  | CreateArticle
  | CreateArticleSuccess
  | UpdateArticle
  | UpdateArticleSuccess
  | DeleteArticle
  | DeleteArticleSuccess
;
