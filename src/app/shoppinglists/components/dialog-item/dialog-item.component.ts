import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
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
export class DialogItemComponent {

  getSelectedShoppinglistId$: Observable<string> = this.store.pipe(select(getSelectedShoppinglistId));

  constructor(
    private store: Store<ItemsState | ShoppinglistsState>,
    private dialogRef: MatDialogRef<DialogItemComponent>
  ) { }

  letterRegex = /^[a-zA-Z_äÄöÖüÜß_ ]+$/;
  form: FormGroup = new FormGroup({
    label: new FormControl('', [
      Validators.required,
      Validators.pattern(this.letterRegex)
    ]),
  });

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
      take(1),
    ).subscribe((selectedShoppinglistId) => {
      this.store.dispatch(new CreateItem(selectedShoppinglistId, item));
    });
    this.form.reset();
  }

  public handleCancelClick(): void {
    this.dialogRef.close();
  }

}
