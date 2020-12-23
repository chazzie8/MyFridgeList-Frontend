import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/shared/models/article.model';
import { Fridge } from 'src/app/shared/models/fridge.model';
import { CreateArticleRequest } from 'src/app/shared/models/requests/create-article-request.model';
import { CreateFridgeRequest } from 'src/app/shared/models/requests/create-fridge-request.model';
import { EditArticleRequest } from 'src/app/shared/models/requests/edit-article-request.model';

@Injectable({
  providedIn: 'root',
})
export class FridgeApiService {

  constructor(
    @Inject('apiBaseUrl') private apiBaseUrl: string,
    private httpClient: HttpClient
  ) { }

  // Get All Fridges
  getFridges(): Observable<Fridge[]> {
    const url = `${this.apiBaseUrl}/fridges`;
    return this.httpClient.get<Fridge[]>(url);
  }

  // Add New Fridge
  addFridge(request: CreateFridgeRequest): Observable<Fridge> {
    const url = `${this.apiBaseUrl}/fridges`;
    return this.httpClient.post<Fridge>(url, request);
  }

  // Get All Articles By Fridge ID
  getArticles(fridgeId: string): Observable<Article[]> {
    const url = `${this.apiBaseUrl}/fridges/${fridgeId}/articles`;
    return this.httpClient.get<Article[]>(url);
  }

  // Add Article By Fridge ID
  addArticle(fridgeId: string, request: CreateArticleRequest): Observable<Article> {
    const url = `${this.apiBaseUrl}/fridges/${fridgeId}/articles`;
    return this.httpClient.post<Article>(url, request);
  }

  // Update Article By Fridge ID
  updateArticle(fridgeId: string, articleId: string, request: EditArticleRequest): Observable<Article> {
    const url = `${this.apiBaseUrl}/fridges/${fridgeId}/articles/${articleId}`;
    return this.httpClient.put<Article>(url, request);
  }

  // Delete Article By Fridge ID
  deleteArticle(fridgeId: string, articleId: string): Observable<{}> {
    const url = `${this.apiBaseUrl}/fridges/${fridgeId}/articles/${articleId}`;
    return this.httpClient.delete<{}>(url);
  }

}
