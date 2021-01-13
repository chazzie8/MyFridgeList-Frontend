import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Item } from 'src/app/shared/models/item.model';

import { DeleteItem } from '../../actions/items-api.actions';
import { ItemsState } from '../../reducers/items.reducer';

@Component({
  selector: 'app-item-list-item',
  templateUrl: './item-list-item.component.html',
  styleUrls: ['./item-list-item.component.scss']
})
export class ItemListItemComponent {

  @Input() item: Item;
  @Input() shoppinglistId: string;

  constructor(
    private store: Store<ItemsState>,
  ) { }

  public handleDeleteItemClick(event: Event): void {
    this.store.dispatch(new DeleteItem(this.shoppinglistId, this.item.id));
    event.stopPropagation();
  }
}
