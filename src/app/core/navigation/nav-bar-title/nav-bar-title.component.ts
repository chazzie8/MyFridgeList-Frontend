import { Component, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FridgesState } from 'src/app/fridges/reducers/fridges.reducer';
import { getSelectedFridge } from 'src/app/fridges/selectors/fridges.selector';
import { Fridge } from 'src/app/shared/models/fridge.model';
import { Shoppinglist } from 'src/app/shared/models/shoppinglist.model';
import { getSelectedShoppinglist } from 'src/app/shoppinglists/selectors/shoppinglists.selector';

import { ShoppinglistsState } from './../../../shoppinglists/reducers/shoppinglists.reducer';

@Component({
  selector: 'app-nav-bar-title',
  templateUrl: './nav-bar-title.component.html',
  styleUrls: ['./nav-bar-title.component.scss']
})
export class NavBarTitleComponent {

  @Input() firstUrlSegment: string;

  selectedFridge$: Observable<Fridge> = this.store.pipe(select(getSelectedFridge));
  selectedShoppinglist$: Observable<Shoppinglist> = this.store.pipe(select(getSelectedShoppinglist));

  constructor(
    private store: Store<FridgesState | ShoppinglistsState>
  ) { }

}
