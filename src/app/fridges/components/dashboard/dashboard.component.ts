import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getUserName } from 'src/app/core/auth/selectors/auth.selectors';
import { BaseAppState } from 'src/app/core/router/reducers/custom-router-serializer.reducer';
import { getFridgeIds } from 'src/app/fridges/selectors/fridges.selector';
import {
  CreateRenameListModalComponent,
} from 'src/app/shared/components/create-rename-list-modal/create-rename-list-modal.component';
import { LoadShoppinglists } from 'src/app/shoppinglists/actions/list-shoppinglists-api.actions';

import { LoadFridgeDashboardArticles } from '../../actions/dashboard-api.actions';
import { PurgeDashboardFridgeArticles } from '../../actions/dashboard.actions';
import { LoadFridges } from '../../actions/list-fridges-api.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  fridgeIds$: Observable<string[] | number[]> = this.store.pipe(select(getFridgeIds));
  userName$: Observable<string> = this.store.pipe(select(getUserName));

  constructor(
    private store: Store<BaseAppState>,
    private dialog: MatDialog,
  ) { }

  public ngOnInit(): void {
    this.loadFridges();
    this.loadShoppinglists();
    this.loadFridgeDashboardArticles();
  }

  public ngOnDestroy(): void {
    this.purgeDashboardFridgeArticles();
  }

  public loadFridgeDashboardArticles(): void {
    this.store.dispatch(new LoadFridgeDashboardArticles());
  }

  public loadFridges(): void {
    this.store.dispatch(new LoadFridges());
  }

  public loadShoppinglists(): void {
    this.store.dispatch(new LoadShoppinglists());
  }

  public purgeDashboardFridgeArticles(): void {
    this.store.dispatch(new PurgeDashboardFridgeArticles());
  }

  public handleAddFridgeClick(): void {
    this.dialog.open(CreateRenameListModalComponent, {
      data: {
        id: null,
        data: null,
        create: 'fridge',
      },
    });
  }

}
