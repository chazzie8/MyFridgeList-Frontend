import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/shared/models/article.model';
import { FridgeDashboardItem } from 'src/app/shared/models/fridge-dashboard-item.model';
import { Fridge } from 'src/app/shared/models/fridge.model';
import { CreateArticleRequest } from 'src/app/shared/models/requests/create-article-request.model';
import { CreateFridgeRequest } from 'src/app/shared/models/requests/create-fridge-request.model';
import { EditArticleRequest } from 'src/app/shared/models/requests/edit-article-request.model';
import { EditNavTitleRequest } from 'src/app/shared/models/requests/edit-nav-title-request.model';
import { ApiResponse } from 'src/app/shared/models/respones/response.model';

@Injectable()
export class FridgeApiService {

  constructor(
    @Inject('apiBaseUrl') private apiBaseUrl: string,
    private httpClient: HttpClient
  ) { }

  // Get All Fridges
  public getFridges(): Observable<ApiResponse<Fridge[]>> {
    const url = `${this.apiBaseUrl}/fridges`;
    return this.httpClient.get<ApiResponse<Fridge[]>>(url);
  }

  // Add New Fridge
  public addFridge(request: CreateFridgeRequest): Observable<ApiResponse<Fridge>> {
    const url = `${this.apiBaseUrl}/fridges`;
    return this.httpClient.post<ApiResponse<Fridge>>(url, request);
  }

  // Update Fridge
  public updateFridge(fridgeId: string, request: EditNavTitleRequest): Observable<ApiResponse<Fridge>> {
    const url = `${this.apiBaseUrl}/fridges/${fridgeId}`;
    return this.httpClient.put<ApiResponse<Fridge>>(url, request);
  }

  // Delete Fridge
  public deleteFridge(fridgeId: string): Observable<ApiResponse<{}>> {
    const url = `${this.apiBaseUrl}/fridges/${fridgeId}`;
    return this.httpClient.delete<ApiResponse<{}>>(url);
  }

  // Get All Dashboard Items By Fridge ID
  public getFridgeDashboardItems(): Observable<ApiResponse<FridgeDashboardItem[]>> {
    const url = `${this.apiBaseUrl}/fridges/dashboard-items`;
    return this.httpClient.get<ApiResponse<FridgeDashboardItem[]>>(url);
  }

  // Get All Articles By Fridge ID
  public getArticles(fridgeId: string): Observable<ApiResponse<Article[]>> {
    const url = `${this.apiBaseUrl}/fridges/${fridgeId}/articles`;
    return this.httpClient.get<ApiResponse<Article[]>>(url);
  }

  // Add Article By Fridge ID
  public addArticle(fridgeId: string, request: CreateArticleRequest): Observable<ApiResponse<Article>> {
    const url = `${this.apiBaseUrl}/fridges/${fridgeId}/articles`;
    return this.httpClient.post<ApiResponse<Article>>(url, request);
  }

  // Update Article By Fridge ID
  public updateArticle(fridgeId: string, articleId: string, request: EditArticleRequest): Observable<ApiResponse<Article>> {
    const url = `${this.apiBaseUrl}/fridges/${fridgeId}/articles/${articleId}`;
    return this.httpClient.put<ApiResponse<Article>>(url, request);
  }

  // Delete Article By Fridge ID
  public deleteArticle(fridgeId: string, articleId: string): Observable<ApiResponse<{}>> {
    const url = `${this.apiBaseUrl}/fridges/${fridgeId}/articles/${articleId}`;
    return this.httpClient.delete<ApiResponse<{}>>(url);
  }

}
