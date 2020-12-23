import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateShoppinglistRequest } from 'src/app/shared/models/requests/create-shoppinglist-request.model';
import { CreateItemRequest } from 'src/app/shared/models/requests/create-item-request.model';
import { Shoppinglist } from 'src/app/shared/models/shoppinglist.model';
import { Item } from 'src/app/shared/models/item.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppinglistApiService {

  constructor(
    @Inject('apiBaseUrl') private apiBaseUrl: string,
    private httpClient: HttpClient
  ) { }

  // Get All Shoppinglists
  getShoppinglists(): Observable<Shoppinglist[]> {
    const url = `${this.apiBaseUrl}/shoppinglists`;
    return this.httpClient.get<Shoppinglist[]>(url);
  }

  // Add New Shoppinglist
  addShoppinglist(request: CreateShoppinglistRequest): Observable<Shoppinglist> {
    const url = `${this.apiBaseUrl}/shoppinglists`;
    return this.httpClient.post<Shoppinglist>(url, request);
  }

  // Get All Items By Shoppinglist ID
  getItems(shoppinglistId: string): Observable<Item[]> {
    const url = `${this.apiBaseUrl}/shoppinglists/${shoppinglistId}/items`;
    return this.httpClient.get<Item[]>(url);
  }

  // Add Item By Shoppinglist ID
  addItem(shoppinglistId: string, request: CreateItemRequest): Observable<Item> {
    const url = `${this.apiBaseUrl}/shoppinglists/${shoppinglistId}/items`;
    return this.httpClient.post<Item>(url, request);
  }

  // Delete Item By Shoppinglist ID
  deleteItem(shoppinglistId: string, itemId: string): Observable<{}> {
    const url = `${this.apiBaseUrl}/shoppinglists/${shoppinglistId}/items/${itemId}`;
    return this.httpClient.delete<{}>(url);
  }

}
