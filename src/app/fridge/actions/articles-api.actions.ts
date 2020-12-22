import { Article } from 'src/app/shared/models/article.model';
import { CreateArticleRequest } from 'src/app/shared/models/requests/create-article-request.model';

export enum ArticleApiActionTypes {

  CreateArticle = '[Article] Create Article',
  CreateArticleSuccess = '[Article] Create Article Success',

  UpdateArticle = '[Article] Update Article',
  UpdateArticleSuccess = '[Article] Update Article Success',

  DeleteArticle = '[Article] Delete Article',
  DeleteArticleSuccess = '[Article] Delete Article Success',
}

export class CreateArticle {
  readonly type = ArticleApiActionTypes.CreateArticle;

  constructor(
    public fridgeId: string,
    public addArticleRequest: CreateArticleRequest
  ) { }
}

export class CreateArticleSuccess {
  readonly type = ArticleApiActionTypes.CreateArticleSuccess;

  constructor(public article: Article) { }
}

export class UpdateArticle {
  readonly type = ArticleApiActionTypes.UpdateArticle;

  constructor(
    public fridgeId: string,
    public article: Article
  ) { }
}

export class UpdateArticleSuccess {
  readonly type = ArticleApiActionTypes.UpdateArticleSuccess;

  constructor(public article: Article) { }
}

export class DeleteArticle {
  readonly type = ArticleApiActionTypes.DeleteArticle;

  constructor(
    public fridgeId: string,
    public articleId: string
  ) { }
}

export class DeleteArticleSuccess {
  readonly type = ArticleApiActionTypes.DeleteArticleSuccess;

  constructor(public articleId: string) { }
}

export type ArticleApiActions =
  | CreateArticle
  | CreateArticleSuccess
  | UpdateArticle
  | UpdateArticleSuccess
  | DeleteArticle
  | DeleteArticleSuccess
;
