import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIARY_MOCK_ARTICLE_API_BASE_URL } from 'src/app/constants';
import { Article } from 'src/app/shared/models/article.model';
import { CreateArticleRequest } from 'src/app/shared/models/requests/create-article-request.model';
import { EditArticleRequest } from 'src/app/shared/models/requests/edit-article-request.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleApiService {

  constructor(private httpClient: HttpClient) { }

  // Get all Articles
  getArticles(): Observable<Article[]> {
    const url = `${APIARY_MOCK_ARTICLE_API_BASE_URL}/articles`;
    return this.httpClient.get<Article[]>(url);
  }

  // Add article without id, get article back with id from backend
  addArticle(request: CreateArticleRequest): Observable<Article> {
    const url = `${APIARY_MOCK_ARTICLE_API_BASE_URL}/articles`;
    return this.httpClient.post<Article>(url, request);
  }

  // Update article by id
  updateArticle(articleId: string, request: EditArticleRequest): Observable<Article> {
    const url = `${APIARY_MOCK_ARTICLE_API_BASE_URL}/articles/${articleId}`;
    return this.httpClient.put<Article>(url, request);
  }

  // Delete article by id
  deleteArticle(articleId: string): Observable<{}> {
    const url = `${APIARY_MOCK_ARTICLE_API_BASE_URL}/articles/${articleId}`;
    return this.httpClient.delete<{}>(url);
  }

}
