import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Item } from 'src/app/shared/models/item.model';

import { LoadItems } from '../../actions/list-items-api.actions';
import { ItemsState } from '../../reducers/items.reducer';
import { getItems } from '../../selectors/items.selector';
import { getSelectedShoppinglistId } from '../../selectors/shoppinglists.selector';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  items$: Observable<Item[]> = this.store.pipe(select(getItems));
  shoppinglistId$: Observable<string> = this.store.pipe(select(getSelectedShoppinglistId));

  constructor(
    private store: Store<ItemsState>,
  ) { }

  ngOnInit(): void{
    this.getItems();
  }

  private getItems(): void {
    this.shoppinglistId$.pipe(
      take(1),
    ).subscribe((shoppinglistId): void => {
      this.store.dispatch(new LoadItems(shoppinglistId));
    });
  }

}
