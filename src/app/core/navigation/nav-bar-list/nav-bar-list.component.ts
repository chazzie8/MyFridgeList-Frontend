import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Fridge } from 'src/app/shared/models/fridge.model';
import { Shoppinglist } from 'src/app/shared/models/shoppinglist.model';

import { GoToSelectedFridge, GoToSelectedShoppinglist } from '../../router/actions/navigation.actions';
import { BaseAppState } from '../../router/reducers/custom-router-serializer.reducer';

@Component({
  selector: 'app-nav-bar-list',
  templateUrl: './nav-bar-list.component.html',
  styleUrls: ['./nav-bar-list.component.scss']
})
export class NavBarListComponent {

  @Input() fridges: Fridge[];
  @Input() shoppinglists: Shoppinglist[];

  constructor(private store: Store<BaseAppState>) { }

  public handleGoToSelectedFridge(fridgeId: string): void {
    this.store.dispatch(new GoToSelectedFridge(fridgeId));
  }

  public handleGoToSelectedShoppinglist(shoppinglistId: string): void {
    this.store.dispatch(new GoToSelectedShoppinglist(shoppinglistId));
  }
}
