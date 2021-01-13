import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/shared/models/item.model';
import { CreateItemRequest } from 'src/app/shared/models/requests/create-item-request.model';
import { CreateShoppinglistRequest } from 'src/app/shared/models/requests/create-shoppinglist-request.model';
import { EditShoppinglistItemRequest } from 'src/app/shared/models/requests/edit-shoppinglist-item-request.model';
import { Shoppinglist } from 'src/app/shared/models/shoppinglist.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppinglistApiService {

  constructor(
    @Inject('apiBaseUrl') private apiBaseUrl: string,
    private httpClient: HttpClient
  ) { }

  // Get All Shoppinglists
  public getShoppinglists(): Observable<Shoppinglist[]> {
    const url = `${this.apiBaseUrl}/shoppinglists`;
    return this.httpClient.get<Shoppinglist[]>(url);
  }

  // Add New Shoppinglist
  public addShoppinglist(request: CreateShoppinglistRequest): Observable<Shoppinglist> {
    const url = `${this.apiBaseUrl}/shoppinglists`;
    return this.httpClient.post<Shoppinglist>(url, request);
  }

  // Update Bought Items
  public updateBoughtItems(shoppinglistId: string, request: EditShoppinglistItemRequest): Observable<Item[]> {
    const url = `${this.apiBaseUrl}/shoppinglists/${shoppinglistId}/update`;
    return this.httpClient.post<Item[]>(url, request);
  }

  // Delete Shoppinglist
  public deleteShoppinglist(shoppinglistId: string): Observable<{}> {
    const url = `${this.apiBaseUrl}/shoppinglists/${shoppinglistId}`;
    return this.httpClient.delete<{}>(url);
  }

  // Get All Items By Shoppinglist ID
  public getItems(shoppinglistId: string): Observable<Item[]> {
    const url = `${this.apiBaseUrl}/shoppinglists/${shoppinglistId}/items`;
    return this.httpClient.get<Item[]>(url);
  }

  // Add Item By Shoppinglist ID
  public addItem(shoppinglistId: string, request: CreateItemRequest): Observable<Item> {
    const url = `${this.apiBaseUrl}/shoppinglists/${shoppinglistId}/items`;
    return this.httpClient.post<Item>(url, request);
  }

  // Delete Item By Shoppinglist ID
  public deleteItem(shoppinglistId: string, itemId: string): Observable<{}> {
    const url = `${this.apiBaseUrl}/shoppinglists/${shoppinglistId}/items/${itemId}`;
    return this.httpClient.delete<{}>(url);
  }

}
