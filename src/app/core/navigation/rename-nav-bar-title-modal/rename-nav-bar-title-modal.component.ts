import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UpdateFridge } from 'src/app/fridges/actions/list-fridges-api.actions';
import { FridgesState } from 'src/app/fridges/reducers/fridges.reducer';
import { Fridge } from 'src/app/shared/models/fridge.model';
import { EditNavTitleRequest } from 'src/app/shared/models/requests/edit-nav-title-request.model';
import { Shoppinglist } from 'src/app/shared/models/shoppinglist.model';
import { UpdateShoppinglist } from 'src/app/shoppinglists/actions/list-shoppinglists-api.actions';
import { ShoppinglistsState } from 'src/app/shoppinglists/reducers/shoppinglists.reducer';

import { BaseAppState } from '../../router/reducers/custom-router-serializer.reducer';
import { getFirstUrlSegment } from '../../selectors/router.selector';

export interface DialogData {
  id: string;
  data: Shoppinglist | Fridge;
}

@Component({
  selector: 'app-rename-nav-bar-title-modal',
  templateUrl: './rename-nav-bar-title-modal.component.html',
  styleUrls: ['./rename-nav-bar-title-modal.component.scss']
})
export class RenameNavBarTitleModalComponent implements OnInit {

  getFirstUrlSegment$: Observable<string> = this.store.pipe(select(getFirstUrlSegment));

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private store: Store<FridgesState | ShoppinglistsState | BaseAppState>,
    public dialogRef: MatDialogRef<RenameNavBarTitleModalComponent>,
  ) { }

  letterRegex = /^[a-zA-Z_ ]+$/;
  form: FormGroup = new FormGroup({
    label: new FormControl('', [
      Validators.required,
      Validators.pattern(this.letterRegex)
    ]),
  });

  public ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    if (this.data.data !== null) {
      console.log(this.data.data);
      this.form.setValue({
        label: this.data.data.name,
      });
    }
  }

  public handleUpdateFridgeClick(data: any): void {
    if (!this.form.valid) {
      return;
    }
    const updateRequest: EditNavTitleRequest = {
      id: this.data.data.id,
      name: this.form.controls.label.value,
    };
    const navTitle = {...data.data, ...updateRequest};
    this.store.dispatch(new UpdateFridge(this.data.id, navTitle));
    this.dialogRef.close();
  }

  public handleUpdateShoppinglistClick(data: any): void {
    if (!this.form.valid) {
      return;
    }
    const updateRequest: EditNavTitleRequest = {
      id: this.data.data.id,
      name: this.form.controls.label.value,
    };
    const navTitle = {...data.data, ...updateRequest};
    this.store.dispatch(new UpdateShoppinglist(this.data.id, navTitle));
    this.dialogRef.close();
  }

  public handleCancelClick(): void {
    this.dialogRef.close();
  }

}
