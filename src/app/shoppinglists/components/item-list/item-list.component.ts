import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { LoadFridges } from 'src/app/fridges/actions/list-fridges-api.actions';
import { Item } from 'src/app/shared/models/item.model';
import { EditShoppinglistItemRequest } from 'src/app/shared/models/requests/edit-shoppinglist-item-request.model';

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

  constructor(
    private store: Store<ItemsState>,
    public dialog: MatDialog,
  ) { }

  public ngOnInit(): void{
    this.store.dispatch(new LoadFridges());

    this.getItems();
    this.getFridges();
  }

  public ngOnDestroy(): void {
    if (this.itemList) {
      const boughtItemIds = this.itemList.selectedOptions.selected.map(
        (ids) => ids.value,
      );

      this.shoppinglistId$.pipe(
        take(1),
      ).subscribe((shoppinglistId): void => {
        const request: EditShoppinglistItemRequest = {
          itemIds: boughtItemIds,
        };
        this.store.dispatch(new UpdateBoughtItems(shoppinglistId, request));
      });
    }
    this.store.dispatch(new PurgeShoppinglistItems());
  }

  public getItems(): void {
    this.shoppinglistId$.pipe(
      take(1),
    ).subscribe((shoppinglistId): void => {
      this.store.dispatch(new LoadItems(shoppinglistId));
    });
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
      take(1),
    ).subscribe((id: string) => {
      this.dialog.open(DialogFridgeItemComponent, {
        disableClose: true,
        data: {
          items: itemObjList,
          shoppinglistId: id,
        }
      });
    });
  }

  public onSelectionChange(): void {
    if (this.itemList.selectedOptions.selected.length < 1) {
      this.buttonAddItemToFridge.disabled = true;
    } else {
      this.buttonAddItemToFridge.disabled = false;
    }
  }

}
