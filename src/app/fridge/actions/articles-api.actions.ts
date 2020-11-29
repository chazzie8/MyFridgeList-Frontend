import { Article } from 'src/app/shared/models/article.model';

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

  constructor(public article: Article) { }
}

export class CreateArticleSuccess {
  readonly type = ArticleApiActionTypes.CreateArticleSuccess;

  constructor(public article: Article) { }
}

export class UpdateArticle {
  readonly type = ArticleApiActionTypes.UpdateArticle;

  constructor(public article: Article) { }
}

export class UpdateArticleSuccess {
  readonly type = ArticleApiActionTypes.UpdateArticleSuccess;

  constructor(public article: Article) { }
}

export class DeleteArticle {
  readonly type = ArticleApiActionTypes.DeleteArticle;

  constructor(public articleId: string) { }
}

export class DeleteArticleSuccess {
  readonly type = ArticleApiActionTypes.DeleteArticleSuccess;

  constructor(public articleId: string) { }
}

export type ArticleApiActions =
  | UpdateArticle
  | UpdateArticleSuccess
  | DeleteArticle
  | DeleteArticleSuccess
;
