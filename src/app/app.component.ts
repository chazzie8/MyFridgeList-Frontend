import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { BaseAppState } from './core/router/reducers/custom-router-serializer.reducer';
import { LoadFridges } from './fridges/actions/list-fridges-api.actions';
import { FridgesState } from './fridges/reducers/fridges.reducer';
import { getFridges } from './fridges/selectors/fridges.selector';
import { Fridge } from './shared/models/fridge.model';
import { Shoppinglist } from './shared/models/shoppinglist.model';
import { LoadShoppinglists } from './shoppinglists/actions/list-shoppinglists-api.actions';
import { ShoppinglistsState } from './shoppinglists/reducers/shoppinglists.reducer';
import { getShoppinglists } from './shoppinglists/selectors/shoppinglists.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MyFridgeList-Frontend';

  fridges$: Observable<Fridge[]> = this.store.pipe(select(getFridges));
  shoppinglists$: Observable<Shoppinglist[]> = this.store.pipe(select(getShoppinglists));

  constructor(
    private store: Store<FridgesState | ShoppinglistsState | BaseAppState>,
  ) { }

  public ngOnInit(): void {
    this.getFridges();
    this.getShoppinglists();
  }

  public getFridges(): void {
    this.store.dispatch(new LoadFridges());
  }

  public getShoppinglists(): void {
    this.store.dispatch(new LoadShoppinglists());
  }
}
