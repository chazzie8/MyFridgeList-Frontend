import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, take, tap } from 'rxjs/operators';
import { DialogAlertComponent } from 'src/app/shared/components/dialog-alert/dialog-alert.component';
import { letterPatternValidator } from 'src/app/shared/form-validators/chars-pattern-validator';
import { CreateItemRequest } from 'src/app/shared/models/requests/create-item-request.model';

import { CreateItem } from '../../actions/items-api.actions';
import { ItemsState } from '../../reducers/items.reducer';
import { ShoppinglistsState } from '../../reducers/shoppinglists.reducer';
import { getSelectedShoppinglistId } from '../../selectors/shoppinglists.selector';

@Component({
  selector: 'app-dialog-item',
  templateUrl: './dialog-item.component.html',
  styleUrls: ['./dialog-item.component.scss']
})
export class DialogItemComponent implements OnInit {

  getSelectedShoppinglistId$: Observable<string> = this.store.pipe(select(getSelectedShoppinglistId));

  constructor(
    private store: Store<ItemsState | ShoppinglistsState>,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<DialogItemComponent>
  ) { }

  form: FormGroup = new FormGroup({
    label: new FormControl('', [
      Validators.required,
      letterPatternValidator
    ]),
  });

  public ngOnInit(): void {
    this.observeBackdropClick();
  }

  private observeBackdropClick(): void {
    this.dialogRef.backdropClick().pipe(
      distinctUntilChanged(),
      tap(() => {
        if (!this.form.dirty) {
          this.handleCancelClick();
        } else {
          this.dialog.open(DialogAlertComponent, {
            disableClose: true,
            autoFocus: false,
          }).afterClosed().subscribe((close: boolean) => {
            if (close) {
              this.dialogRef.close();
            }
          });
        }
      }),
    ).subscribe();
  }

  public handleAddClick(): void {
    if (!this.form.valid) {
      return;
    }
    const addRequest: CreateItemRequest = {
      label: this.form.controls.label.value,
      bought: false,
    };
    const item = {...addRequest};
    this.getSelectedShoppinglistId$.pipe(
      filter((selectedShoppinglistId) => Boolean(selectedShoppinglistId)),
      take(1),
      tap((selectedShoppinglistId) => {
        this.store.dispatch(new CreateItem(selectedShoppinglistId, item));
      }),
    ).subscribe();

    this.form.reset();
  }

  public handleAddAndCancelClick(): void {
    if (!this.form.valid) {
      return;
    }
    const addRequest: CreateItemRequest = {
      label: this.form.controls.label.value,
      bought: false,
    };
    const item = {...addRequest};
    this.getSelectedShoppinglistId$.pipe(
      filter((selectedShoppinglistId) => Boolean(selectedShoppinglistId)),
      take(1),
      tap((selectedShoppinglistId) => {
        this.store.dispatch(new CreateItem(selectedShoppinglistId, item));
      }),
    ).subscribe();

    this.dialogRef.close();
  }

  public handleCancelClick(): void {
    this.dialogRef.close();
  }
}
