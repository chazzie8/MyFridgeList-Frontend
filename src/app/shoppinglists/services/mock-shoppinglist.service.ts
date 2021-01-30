import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Item } from 'src/app/shared/models/item.model';
import { CreateItemRequest } from 'src/app/shared/models/requests/create-item-request.model';
import { CreateShoppinglistRequest } from 'src/app/shared/models/requests/create-shoppinglist-request.model';
import { EditNavTitleRequest } from 'src/app/shared/models/requests/edit-nav-title-request.model';
import { EditShoppinglistItemRequest } from 'src/app/shared/models/requests/edit-shoppinglist-item-request.model';
import { ApiResponse } from 'src/app/shared/models/respones/response.model';
import { Shoppinglist } from 'src/app/shared/models/shoppinglist.model';

@Injectable()
export class MockShoppinglistApiService {

  public getShoppinglists(): Observable<ApiResponse<Shoppinglist[]>> {
    const res: ApiResponse<Shoppinglist[]> = {
      success: true,
      data: [
        {
          id: '6564-9713-3737-1892',
          name: 'Lidl',
        },
        {
          id: '6926-7467-3737-3736',
          name: 'Netto',
        },
        {
          id: '3198-7467-2182-3728',
          name: 'Edeka',
        },
      ],
      validationErrors: [],
    };
    return of(res).pipe(delay(1000));
  }

  // tslint:disable-next-line:variable-name
  public addShoppinglist(_request: CreateShoppinglistRequest): Observable<ApiResponse<Shoppinglist>> {
    const res: ApiResponse<Shoppinglist> = {
      success: true,
      data: {
        id: '1927-6076-1782-4624',
        name: 'Test Einkaufsliste',
      },
      validationErrors: [],
    };
    return of(res).pipe(delay(1000));
  }

  // tslint:disable-next-line:variable-name
  public updateShoppinglist(_shoppinglistId: string, _request: EditNavTitleRequest): Observable<ApiResponse<Shoppinglist>> {
    const res: ApiResponse<Shoppinglist> = {
      success: true,
      data: {
        id: '3198-7467-2182-3728',
        name: 'Update Einkaufliste',
      },
      validationErrors: [],
    };
    return of(res).pipe(delay(1000));
  }

  // tslint:disable-next-line:variable-name
  public deleteShoppinglist(_shoppinglistId: string): Observable<ApiResponse<{}>> {
    const res: ApiResponse<{}> = {
      success: true,
      validationErrors: [],
      data: {},
    };
    return of(res).pipe(delay(1000));
  }

  // tslint:disable-next-line:variable-name
  public getItems(_shoppinglistId: string): Observable<ApiResponse<Item[]>> {
    const res: ApiResponse<Item[]> = {
      success: true,
      data: [
        {
          id: '6564-7467-3737-3736',
          label: 'Milch',
          bought: true,
        },
        {
          id: '6534-7467-3747-1236',
          label: 'Bier',
          bought: false,
        },
        {
          id: '6564-7467-3437-3736',
          label: 'Milch',
          bought: false,
        },
        {
          id: '6534-7467-3747-1436',
          label: 'Bier',
          bought: true,
        },
        {
          id: '6564-7467-3737-3336',
          label: 'Milch',
          bought: false,
        },
        {
          id: '6534-7467-3747-12364',
          label: 'Bier',
          bought: false,
        },
      ],
      validationErrors: [],
    };
    return of(res).pipe(delay(1000));
  }

  // tslint:disable-next-line:variable-name
  public addItem(_shoppinglistId: string, _request: CreateItemRequest): Observable<ApiResponse<Item>> {
    const res: ApiResponse<Item> = {
      success: true,
      data: {
        id: '3201-6076-1808-1782',
        label: 'Jogurt',
        bought: false,
      },
      validationErrors: [],
    };
    return of(res).pipe(delay(1000));
  }

  // tslint:disable-next-line:variable-name
  public deleteItem(_shoppinglistId: string, _itemId: string): Observable<ApiResponse<{}>> {
    const res: ApiResponse<{}> = {
      success: true,
      data: {},
      validationErrors: [],
    };
    return of(res).pipe(delay(1000));
  }

  // tslint:disable-next-line:variable-name
  public updateBoughtItems(_shoppinglistId: string, _request: EditShoppinglistItemRequest): Observable<ApiResponse<Item[]>> {
    const res: ApiResponse<Item[]> = {
      success: true,
      data: [
        {
          id: '6564-7467-3737-3736',
          label: 'Milch',
          bought: false,
        },
        {
          id: '6534-7467-3747-1236',
          label: 'Bier',
          bought: true,
        },
        {
          id: '6564-7467-3437-3736',
          label: 'Milch',
          bought: true,
        },
        {
          id: '6534-7467-3747-1436',
          label: 'Bier',
          bought: false,
        },
        {
          id: '6564-7467-3737-3336',
          label: 'Milch',
          bought: true,
        },
        {
          id: '6534-7467-3747-12364',
          label: 'Bier',
          bought: true,
        },
      ],
      validationErrors: [],
    };
    return of(res).pipe(delay(1000));
  }
}
