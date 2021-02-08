import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Article } from 'src/app/shared/models/article.model';
import { DashboardArticle } from 'src/app/shared/models/dashboard-article.model';
import { CreateArticleRequest } from 'src/app/shared/models/requests/create-article-request.model';
import { CreateFridgeRequest } from 'src/app/shared/models/requests/create-fridge-request.model';
import { EditArticleRequest } from 'src/app/shared/models/requests/edit-article-request.model';
import { EditNavTitleRequest } from 'src/app/shared/models/requests/edit-nav-title-request.model';
import { ApiResponse } from 'src/app/shared/models/respones/response.model';

import { Fridge } from './../../shared/models/fridge.model';

@Injectable()
export class MockFridgeApiService {

  public getFridges(): Observable<ApiResponse<Fridge[]>> {
    const res: ApiResponse<Fridge[]> = {
      success: true,
      data: [
        {
          id: '6564-7467-3737-1892',
          name: 'Mein Zuhause',
        },
        {
          id: '3198-7467-3737-3736',
          name: 'Freundin',
        },
        {
          id: '3198-7467-2182-3736',
          name: 'Mutter',
        },
        {
          id: '3198-7467-2182-3w226',
          name: 'Leer',
        },
      ],
      validationErrors: [],
    };
    return of(res).pipe(delay(1000));
  }

  // tslint:disable-next-line:variable-name
  public addFridge(_request: CreateFridgeRequest): Observable<ApiResponse<Fridge>> {
    const res: ApiResponse<Fridge> = {
      success: true,
      data: {
        id: '2463-4833-5356-6667',
        name: 'Test Kühlschrank',
      },
      validationErrors: [],
    };
    return of(res).pipe(delay(1000));
  }

  // tslint:disable-next-line:variable-name
  public updateFridge(_fridgeId: string, _request: EditNavTitleRequest): Observable<ApiResponse<Fridge>> {
    const res: ApiResponse<Fridge> = {
      success: true,
      data: {
        id: '3198-7467-3737-3736',
        name: 'Update Kühlschrank',
      },
      validationErrors: [],
    };
    return of(res).pipe(delay(1000));
  }

  // tslint:disable-next-line:variable-name
  public deleteFridge(_fridgeId: string): Observable<ApiResponse<{}>> {
    const res: ApiResponse<{}> = {
      success: true,
      validationErrors: [],
      data: {},
    };
    return of(res).pipe(delay(1000));
  }

  public getFridgeDashboardItems(): Observable<ApiResponse<DashboardArticle[]>> {
    const res: ApiResponse<DashboardArticle[]> = {
      success: true,
      data: [
        {
          id: '3198-7467-3737-37326',
          fridgeId: '6564-7467-3737-1892',
          articleName: 'Schinken',
          expirydate: new Date('2020-09-10T08:40:51.620Z'),
          amount: 1,
          expirystatus: '',
        },
        {
          id: '3198-7467-3737-37236',
          fridgeId: '6564-7467-3737-1892',
          articleName: 'Milch',
          expirydate: new Date('2020-09-10T08:40:51.620Z'),
          amount: 6,
          expirystatus: '',
        },
        {
          id: '3198-7467-3737-32736',
          fridgeId: '6564-7467-3737-1892',
          articleName: 'Milch',
          expirydate: new Date('2020-09-10T08:40:51.620Z'),
          amount: 2,
          expirystatus: '',
        },
        {
          id: '3198-7467-3737-1736',
          fridgeId: '3198-7467-3737-3736',
          articleName: 'Milch',
          expirydate: new Date('2020-09-10T08:40:51.620Z'),
          amount: 2,
          expirystatus: '',
        },
        {
          id: '3198-7467-3737-3724',
          fridgeId: '3198-7467-3737-3736',
          articleName: 'Milch',
          expirydate: new Date('2020-09-10T08:40:51.620Z'),
          amount: 3,
          expirystatus: '',
        },
        {
          id: '3198-7467-3737-3742',
          fridgeId: '3198-7467-3737-3736',
          articleName: 'Milch',
          expirydate: new Date('2020-09-10T08:40:51.620Z'),
          amount: 2,
          expirystatus: '',
        },
        {
          id: '3198-7467-37374-3724',
          fridgeId: '3198-7467-3737-3736',
          articleName: 'Milch',
          expirydate: new Date('2020-09-10T08:40:51.620Z'),
          amount: 3,
          expirystatus: '',
        },
        {
          id: '3198-7467-37373-3742',
          fridgeId: '3198-7467-2182-3736',
          articleName: 'Milch',
          expirydate: new Date('2020-09-10T08:40:51.620Z'),
          amount: 2,
          expirystatus: '',
        },
        {
          id: '3198-7467-37437-3724',
          fridgeId: '3198-7467-2182-3736',
          articleName: 'Milch',
          expirydate: new Date('2020-09-10T08:40:51.620Z'),
          amount: 3,
          expirystatus: '',
        },
        {
          id: '3198-7467-37327-3742',
          fridgeId: '3198-7467-2182-3736',
          articleName: 'Milch',
          expirydate: new Date('2020-09-10T08:40:51.620Z'),
          amount: 2,
          expirystatus: '',
        },
      ],
      validationErrors: [],
    };
    return of(res).pipe(delay(1000));
  }

  // tslint:disable-next-line:variable-name
  public getArticles(_fridgeId: string): Observable<ApiResponse<Article[]>> {
    const res: ApiResponse<Article[]> = {
      success: true,
      data: [
        {
          id: '6564-7467-3737-3736',
          label: 'Milch Nicht abgelaufen',
          amount: 10,
          expirydate: new Date('2020-09-10T08:40:51.620Z'),
          timestamp: new Date('2020-09-10T08:40:51.620Z'),
          expirystatus: '',
        },
        {
          id: '6564-7467-3737-36',
          label: 'Fast abgelaufen',
          amount: 10,
          expirydate: new Date('2020-09-10T08:40:51.620Z'),
          timestamp: new Date('2020-09-10T08:40:51.620Z'),
          expirystatus: '',
        },
        {
          id: '6534-7467-3747-1236',
          label: 'Bier',
          amount: 16,
          expirydate: new Date('2020-09-10T08:40:51.620Z'),
          timestamp: new Date('2020-09-10T08:40:51.620Z'),
          expirystatus: '',
        },
        {
          id: '6534-7467-3747-a036',
          label: 'Bier',
          amount: 16,
          expirydate: new Date('2020-09-10T08:40:51.620Z'),
          timestamp: new Date('2020-09-10T08:40:51.620Z'),
          expirystatus: '',
        },
        {
          id: '6564-7467-3737-34536',
          label: 'Milch',
          amount: 10,
          expirydate: new Date('2020-09-10T08:40:51.620Z'),
          timestamp: new Date('2020-09-10T08:40:51.620Z'),
          expirystatus: '',
        },
        {
          id: '6534-7467-3747-0546',
          label: 'Bier',
          amount: 16,
          expirydate: new Date('2020-09-10T08:40:51.620Z'),
          timestamp: new Date('2020-09-10T08:40:51.620Z'),
          expirystatus: '',
        },
        {
          id: '6564-7467-3737-3745',
          label: 'Milch',
          amount: 10,
          expirydate: new Date('2020-09-10T08:40:51.620Z'),
          timestamp: new Date('2020-09-10T08:40:51.620Z'),
          expirystatus: '',
        },
        {
          id: '6534-7467-3747-0035',
          label: 'Bier',
          amount: 16,
          expirydate: new Date('2020-09-10T08:40:51.620Z'),
          timestamp: new Date('2020-09-10T08:40:51.620Z'),
          expirystatus: '',
        },
      ],
      validationErrors: [],
    };
    return of(res).pipe(delay(1000));
  }

  // tslint:disable-next-line:variable-name
  public addArticle(_fridgeId: string, _request: CreateArticleRequest): Observable<ApiResponse<Article>> {
    const res: ApiResponse<Article> = {
      success: true,
      data: {
        id: '3201-6076-1808-4624',
        label: 'Schinkenwurst',
        amount: 4,
        expirydate: new Date('2020-09-10T08:40:51.620Z'),
        timestamp: new Date('2020-09-10T08:40:51.620Z'),
        expirystatus: '',
      },
      validationErrors: [],
    };
    return of(res).pipe(delay(1000));
  }

  // tslint:disable-next-line:variable-name
  public updateArticle(_fridgeId: string, _articleId: string, _request: EditArticleRequest): Observable<ApiResponse<Article>> {
    const res: ApiResponse<Article> = {
      success: true,
      data: {
        id: '6564-7467-3737-3736',
        label: 'MilchUpdated',
        amount: 100,
        expirydate: new Date('2020-09-10T08:40:51.620Z'),
        timestamp: new Date('2020-09-10T08:40:51.620Z'),
        expirystatus: '',
      },
      validationErrors: [],
    };
    return of(res).pipe(delay(1000));
  }

  // tslint:disable-next-line:variable-name
  public deleteArticle(_fridgeId: string, _articleId: string): Observable<ApiResponse<{}>> {
    const res: ApiResponse<{}> = {
      success: true,
      data: {},
      validationErrors: [],
    };
    return of(res).pipe(delay(1000));
  }
}
