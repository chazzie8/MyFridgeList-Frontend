import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Fridge } from 'src/app/shared/models/fridge.model';
import { Shoppinglist } from 'src/app/shared/models/shoppinglist.model';

import { GoToSelectedFridge, GoToSelectedShoppinglist } from '../../router/actions/navigation.actions';
import { BaseAppState } from '../../router/reducers/custom-router-serializer.reducer';

@Component({
  selector: 'app-side-nav-bar-list',
  templateUrl: './side-nav-bar-list.component.html',
  styleUrls: ['./side-nav-bar-list.component.scss']
})
export class SideNavBarListComponent {

  @Input() fridges: Fridge[];
  @Input() shoppinglists: Shoppinglist[];

  constructor(
    private store: Store<BaseAppState>,
    public sidenav: MatSidenav
  ) { }

  public handleGoToSelectedFridge(fridgeId: string): void {
    this.store.dispatch(new GoToSelectedFridge(fridgeId));
    this.sidenav.close();
  }

  public handleGoToSelectedShoppinglist(shoppinglistId: string): void {
    this.store.dispatch(new GoToSelectedShoppinglist(shoppinglistId));
    this.sidenav.close();
  }
}
