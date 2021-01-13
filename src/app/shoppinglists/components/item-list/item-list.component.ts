import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Item } from 'src/app/shared/models/item.model';
import { EditShoppinglistItemRequest } from 'src/app/shared/models/requests/edit-shoppinglist-item-request.model';

import { LoadItems } from '../../actions/list-items-api.actions';
import { ItemsState } from '../../reducers/items.reducer';
import { getItems } from '../../selectors/items.selector';
import { getSelectedShoppinglistId } from '../../selectors/shoppinglists.selector';
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

  items$: Observable<Item[]> = this.store.pipe(select(getItems));
  shoppinglistId$: Observable<string> = this.store.pipe(select(getSelectedShoppinglistId));

  constructor(
    private store: Store<ItemsState>,
    public dialog: MatDialog,
  ) { }

  public ngOnInit(): void{
    this.getItems();
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

  public handleOpenDialogClick(): void {
    this.dialog.open(DialogItemComponent, {
      disableClose: true,
    });
  }

}
