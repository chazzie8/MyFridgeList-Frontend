import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getUserName } from 'src/app/core/auth/selectors/auth.selectors';
import { FridgesState } from 'src/app/fridges/reducers/fridges.reducer';
import { getFridgeIds } from 'src/app/fridges/selectors/fridges.selector';
import { LoadShoppinglists } from 'src/app/shoppinglists/actions/list-shoppinglists-api.actions';

import { LoadFridgeDashboardItems } from '../../actions/dashboard-api.actions';
import { LoadFridges } from '../../actions/list-fridges-api.actions';
import { PurgeDashboardFridgeItems } from './../../actions/fridge.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  fridgeIds$: Observable<string[] | number[]> = this.store.pipe(select(getFridgeIds));
  userName$: Observable<string> = this.store.pipe(select(getUserName));

  constructor(
    private store: Store<FridgesState>,
  ) { }

  public ngOnInit(): void {
    this.loadFridges();
    this.loadShoppinglists();
    this.loadFridgeDashboardItems();
  }

  public ngOnDestroy(): void {
    this.store.dispatch(new PurgeDashboardFridgeItems());
    this.loadFridgeDashboardItems();
  }

  public loadFridgeDashboardItems(): void {
    this.store.dispatch(new LoadFridgeDashboardItems());
  }

  public loadFridges(): void {
    this.store.dispatch(new LoadFridges());
  }

  public loadShoppinglists(): void {
    this.store.dispatch(new LoadShoppinglists());
  }

}
