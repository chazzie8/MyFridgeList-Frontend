import { CreateArticleRequest } from './create-article-request.model';

export interface EditArticleRequest extends CreateArticleRequest {
  id: string;
}
