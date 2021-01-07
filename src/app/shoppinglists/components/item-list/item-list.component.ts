import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ArticlesState } from 'src/app/fridges/reducers/articles.reducer';
import { Item } from 'src/app/shared/models/item.model';

import { LoadItems } from '../../actions/list-items-api.actions';
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
    private store: Store<ArticlesState>,
  ) { }

  ngOnInit(): void{
    this.getItems();
    this.items$.subscribe(item => {
      console.log(item);
    });
  }

  private getItems(): void {
    this.shoppinglistId$.subscribe((shoppinglistId): void => {
      this.store.dispatch(new LoadItems(shoppinglistId));
    });
  }

}
