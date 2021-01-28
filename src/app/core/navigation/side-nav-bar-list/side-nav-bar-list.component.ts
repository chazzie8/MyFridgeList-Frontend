import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { BaseAppState } from 'src/app/core/router/reducers/custom-router-serializer.reducer';
import {
  CreateRenameListModalComponent,
} from 'src/app/shared/components/create-rename-list-modal/create-rename-list-modal.component';
import { Fridge } from 'src/app/shared/models/fridge.model';
import { Shoppinglist } from 'src/app/shared/models/shoppinglist.model';

import { GoToSelectedFridge, GoToSelectedShoppinglist } from './../../router/actions/navigation.actions';

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
    private dialog: MatDialog,
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

  public handleOpenCreateNewFridgeModalClick(): void {
    this.sidenav.close();
    this.dialog.open(CreateRenameListModalComponent, {
      data: {
        id: null,
        data: null,
        create: 'fridge',
      },
    });
  }

  public handleOpenCreateNewShoppinglistModalClick(): void {
    this.sidenav.close();
    this.dialog.open(CreateRenameListModalComponent, {
      data: {
        id: null,
        data: null,
        create: 'shoppinglist',
      },
    });
  }

}
