import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DeleteFridge } from 'src/app/fridges/actions/list-fridges-api.actions';
import { FridgesState } from 'src/app/fridges/reducers/fridges.reducer';
import { getSelectedFridge, getSelectedFridgeId } from 'src/app/fridges/selectors/fridges.selector';
import { Fridge } from 'src/app/shared/models/fridge.model';
import { Shoppinglist } from 'src/app/shared/models/shoppinglist.model';
import { ShoppinglistsState } from 'src/app/shoppinglists/reducers/shoppinglists.reducer';
import { getSelectedShoppinglist, getSelectedShoppinglistId } from 'src/app/shoppinglists/selectors/shoppinglists.selector';

import { BaseAppState } from '../../router/reducers/custom-router-serializer.reducer';
import { RenameNavBarTitleModalComponent } from '../rename-nav-bar-title-modal/rename-nav-bar-title-modal.component';
import { DeleteShoppinglist } from './../../../shoppinglists/actions/list-shoppinglists-api.actions';
import { getFirstUrlSegment } from './../../selectors/router.selector';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit{

  @Output() menuButtonClick = new EventEmitter<boolean>();

  getFirstUrlSegment$: Observable<string> = this.store.pipe(select(getFirstUrlSegment));
  fridgeId$: Observable<string> = this.store.pipe(select(getSelectedFridgeId));
  shoppinglistId$: Observable<string> = this.store.pipe(select(getSelectedShoppinglistId));
  selectedFridge$: Observable<Fridge> = this.store.pipe(select(getSelectedFridge));
  selectedShoppinglist$: Observable<Shoppinglist> = this.store.pipe(select(getSelectedShoppinglist));

  constructor(
    private store: Store<FridgesState | ShoppinglistsState | BaseAppState>,
    public dialog: MatDialog,
  ) { }

  public ngOnInit(): void {
    this.selectedFridge$ = this.store.pipe(select(getSelectedFridge));
    this.selectedShoppinglist$ = this.store.pipe(select(getSelectedShoppinglist));
  }

  public handleNavButtonClick(): void {
    this.menuButtonClick.emit(true);
  }

  public handleDeleteFridgeClick(fridgeId: string): void {
    this.store.dispatch(new DeleteFridge(fridgeId));
  }

  public handleDeleteShoppinglistClick(shoppinglistId: string): void {
    this.store.dispatch(new DeleteShoppinglist(shoppinglistId));
  }

  public handleOpenDialogUpdateFridge(fridgeId: string, fridge: Fridge): void {
    this.dialog.open(RenameNavBarTitleModalComponent, {
      data: {
        id: fridgeId,
        data: fridge,
      }
    });
  }

  public handleOpenDialogUpdateShoppinglist(shoppinglistId: string, shoppinglist: Shoppinglist): void {
    this.dialog.open(RenameNavBarTitleModalComponent, {
      data: {
        id: shoppinglistId,
        data: shoppinglist,
      }
    });
  }

}
