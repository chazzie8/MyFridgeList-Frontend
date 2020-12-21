import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIARY_MOCK_API_BASE_URL, APIARY_MOCK_ARTICLE_API_BASE_URL } from 'src/app/constants';
import { Article } from 'src/app/shared/models/article.model';
import { CreateArticleRequest } from 'src/app/shared/models/requests/create-article-request.model';
import { CreateFridgeRequest } from 'src/app/shared/models/requests/create-fridge-request.model';
import { EditArticleRequest } from 'src/app/shared/models/requests/edit-article-request.model';
import { Fridge } from 'src/app/shared/models/responses/fridge.model';

@Injectable({
  providedIn: 'root',
})
export class FridgeApiService {

  constructor(private httpClient: HttpClient) { }

  // // Get all Articles
  // getArticles(): Observable<Article[]> {
  //   const url = `${APIARY_MOCK_ARTICLE_API_BASE_URL}/articles`;
  //   return this.httpClient.get<Article[]>(url);
  // }

  // // Add article without id, get article back with id from backend
  // addArticle(request: CreateArticleRequest): Observable<Article> {
  //   const url = `${APIARY_MOCK_ARTICLE_API_BASE_URL}/articles`;
  //   return this.httpClient.post<Article>(url, request);
  // }

  // // Update article by id
  // updateArticle(articleId: string, request: EditArticleRequest): Observable<Article> {
  //   const url = `${APIARY_MOCK_ARTICLE_API_BASE_URL}/articles/${articleId}`;
  //   return this.httpClient.put<Article>(url, request);
  // }

  // // Delete article by id
  // deleteArticle(articleId: string): Observable<{}> {
  //   const url = `${APIARY_MOCK_ARTICLE_API_BASE_URL}/articles/${articleId}`;
  //   return this.httpClient.delete<{}>(url);
  // }

  // Get all user fridges
  getFridges(): Observable<Fridge[]> {
    const url = `${APIARY_MOCK_API_BASE_URL}/fridges`;
    return this.httpClient.get<Fridge[]>(url);
  }

  addFridge(request: CreateFridgeRequest): Observable<Fridge> {
    const url = `${APIARY_MOCK_API_BASE_URL}/fridges`;
    return this.httpClient.post<Fridge>(url, request);
  }

  getArticles(fridgeId: string): Observable<Article[]> {
    const url = `${APIARY_MOCK_API_BASE_URL}/fridges/${fridgeId}/articles`;
    return this.httpClient.get<Article[]>(url);
  }

  addArticle(fridgeId: string, request: CreateArticleRequest): Observable<Article> {
    const url = `${APIARY_MOCK_API_BASE_URL}/fridges/${fridgeId}/articles`;
    return this.httpClient.post<Article>(url, request);
  }

  updateArticle(fridgeId: string, articleId: string, request: EditArticleRequest): Observable<Article> {
    const url = `${APIARY_MOCK_API_BASE_URL}/fridges/${fridgeId}/articles/${articleId}`;
    return this.httpClient.put<Article>(url, request);
  }

  deleteArticle(fridgeId: string, articleId: string): Observable<{}> {
    const url = `${APIARY_MOCK_API_BASE_URL}/fridges/${fridgeId}/articles/${articleId}`;
    return this.httpClient.delete<{}>(url);
  }

}
