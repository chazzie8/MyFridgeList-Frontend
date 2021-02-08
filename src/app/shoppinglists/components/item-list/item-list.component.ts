import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, take, tap } from 'rxjs/operators';
import { LoadFridges } from 'src/app/fridges/actions/list-fridges-api.actions';
import { Item } from 'src/app/shared/models/item.model';
import { EditShoppinglistItemRequest } from 'src/app/shared/models/requests/edit-shoppinglist-item-request.model';
import { LoadShoppinglists } from 'src/app/shoppinglists/actions/list-shoppinglists-api.actions';

import { LoadItems } from '../../actions/list-items-api.actions';
import { ItemsState } from '../../reducers/items.reducer';
import { getItems, getSelectedItemById } from '../../selectors/items.selector';
import { getSelectedShoppinglistId } from '../../selectors/shoppinglists.selector';
import { DialogFridgeItemComponent } from '../dialog-fridge-item/dialog-fridge-item.component';
import { DialogItemComponent } from '../dialog-item/dialog-item.component';
import { UpdateBoughtItems } from './../../actions/items-api.actions';
import { PurgeShoppinglistItems } from './../../actions/shoppinglist.actions';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit, OnDestroy {

  @ViewChild(MatSelectionList) itemList: MatSelectionList;
  @ViewChild(MatButton) buttonAddItemToFridge: MatButton;

  items$: Observable<Item[]> = this.store.pipe(select(getItems));
  shoppinglistId$: Observable<string> = this.store.pipe(select(getSelectedShoppinglistId));

  // tslint:disable-next-line:variable-name
  private _shoppinglistId: string;

  constructor(
    private store: Store<ItemsState>,
    public dialog: MatDialog,
  ) { }

  public ngOnInit(): void{
    this.getFridges();
    this.getShoppinglists();
    this.observeShoppinglist();
  }

  public ngOnDestroy(): void {
    if (this._shoppinglistId !== undefined) {
      if (this.itemList) {
        const boughtItemIds = this.itemList.selectedOptions.selected.map(
          (ids) => ids.value,
        );
        const request: EditShoppinglistItemRequest = {
          itemIds: boughtItemIds,
        };
        this.store.dispatch(new UpdateBoughtItems(this._shoppinglistId, request));
      }
      this.store.dispatch(new PurgeShoppinglistItems());
    }
  }

  public observeShoppinglist(): void {
    this.shoppinglistId$.pipe(
      filter((id: string) => Boolean(id)),
      distinctUntilChanged(),
      tap((id: string) => {
        this._shoppinglistId = id;
        this.getItems();
      }),
    ).subscribe();
  }

  public getShoppinglists(): void {
    this.store.dispatch(new LoadShoppinglists());
  }

  public getItems(): void {
    this.shoppinglistId$.pipe(
      filter((shoppinglistId) => Boolean(shoppinglistId)),
      take(1),
      tap((shoppinglistId): void => {
        this.store.dispatch(new LoadItems(shoppinglistId));
      }),
    ).subscribe();
  }

  public getFridges(): void {
    this.store.dispatch(new LoadFridges());
  }

  public handleOpenDialogClick(): void {
    this.dialog.open(DialogItemComponent, {
      disableClose: true,
    });
  }

  public handleOpenAddItemsToFrigdeDialogClick(): void {
    const itemObjList: Item[] = [];
    const boughtItemIds = this.itemList.selectedOptions.selected.map(
      (ids) => {
        return ids.value;
      },
    );

    boughtItemIds.forEach((boughtItem: string) => {
      const item = this.store.pipe(select(getSelectedItemById, boughtItem));
      item.pipe(take(1), ).subscribe(i => itemObjList.push(i[0]));
    });

    this.shoppinglistId$.pipe(
      filter((shoppinglistId) => Boolean(shoppinglistId)),
      take(1),
      tap((id: string) => {
        this.dialog.open(DialogFridgeItemComponent, {
          disableClose: true,
          data: {
            items: itemObjList,
            shoppinglistId: id,
          }
        });
      }),
    ).subscribe();
  }

}
