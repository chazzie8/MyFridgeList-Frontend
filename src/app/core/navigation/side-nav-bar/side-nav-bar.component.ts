import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GoToDashboard } from 'src/app/core/router/actions/navigation.actions';
import { BaseAppState } from 'src/app/core/router/reducers/custom-router-serializer.reducer';
import { LoadFridges } from 'src/app/fridges/actions/list-fridges-api.actions';
import { getFridges } from 'src/app/fridges/selectors/fridges.selector';
import { Fridge } from 'src/app/shared/models/fridge.model';
import { Shoppinglist } from 'src/app/shared/models/shoppinglist.model';
import { LoadShoppinglists } from 'src/app/shoppinglists/actions/list-shoppinglists-api.actions';
import { getShoppinglists } from 'src/app/shoppinglists/selectors/shoppinglists.selector';

import { Logout } from '../../auth/actions/auth.actions';
import { isLoggedIn } from '../../auth/selectors/auth.selectors';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss']
})
export class SideNavBarComponent implements OnInit {

  isLoggedIn$: Observable<boolean> = this.store.pipe(select(isLoggedIn));
  fridges$: Observable<Fridge[]> = this.store.pipe(select(getFridges));
  shoppinglists$: Observable<Shoppinglist[]> = this.store.pipe(select(getShoppinglists));

  constructor(
    private store: Store<BaseAppState>,
    public sidenav: MatSidenav
  ) { }

  public ngOnInit(): void {
    this.store.dispatch(new LoadFridges());
    this.store.dispatch(new LoadShoppinglists());
  }

  handleGoToDashboardClick(): void {
    this.store.dispatch(new GoToDashboard());
    this.sidenav.close();
  }

  public handleLogoutClick(): void {
    this.store.dispatch(new Logout());
    this.sidenav.close();
  }
}
