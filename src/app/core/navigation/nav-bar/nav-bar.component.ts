import { Component, EventEmitter, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FridgesState } from 'src/app/fridges/reducers/fridges.reducer';
import { getSelectedFridgeId } from 'src/app/fridges/selectors/fridges.selector';
import { ShoppinglistsState } from 'src/app/shoppinglists/reducers/shoppinglists.reducer';
import { getSelectedShoppinglistId } from 'src/app/shoppinglists/selectors/shoppinglists.selector';

import { BaseAppState } from '../../router/reducers/custom-router-serializer.reducer';
import { getFirstUrlSegment } from '../../selectors/router.selector';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  @Output() menuButtonClick = new EventEmitter<boolean>();

  firstUrlSegment$: Observable<string> = this.store.pipe(select(getFirstUrlSegment));
  fridgeId$: Observable<string> = this.store.pipe(select(getSelectedFridgeId));
  shoppinglistId$: Observable<string> = this.store.pipe(select(getSelectedShoppinglistId));

  constructor(
    private store: Store<FridgesState | ShoppinglistsState | BaseAppState>,
  ) { }

  public handleNavButtonClick(): void {
    this.menuButtonClick.emit(true);
  }

}
