import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIARY_MOCK_ARTICLE_API_BASE_URL } from 'src/app/constants';
import { Article } from 'src/app/shared/models/article.model';

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

}
