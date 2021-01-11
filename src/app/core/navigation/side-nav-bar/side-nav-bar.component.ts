import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Shoppinglist } from 'src/app/shared/models/shoppinglist.model';

import { BaseAppState } from '../../router/reducers/custom-router-serializer.reducer';
import { Fridge } from './../../../shared/models/fridge.model';
import { GoToDashboard } from './../../router/actions/navigation.actions';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss']
})
export class SideNavBarComponent {

  @Input() fridges: Fridge[];
  @Input() shoppinglists: Shoppinglist[];

  constructor(
    private store: Store<BaseAppState>,
    public sidenav: MatSidenav
  ) { }

  handleGoToDashboardClick(): void {
    this.store.dispatch(new GoToDashboard());
    this.sidenav.close();
  }

}
