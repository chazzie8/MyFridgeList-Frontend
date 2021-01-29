import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BaseAppState } from 'src/app/core/router/reducers/custom-router-serializer.reducer';
import { getFirstUrlSegment } from 'src/app/core/selectors/router.selector';
import { CreateFridge, UpdateFridge } from 'src/app/fridges/actions/list-fridges-api.actions';
import { FridgesState } from 'src/app/fridges/reducers/fridges.reducer';
import { EditNavTitleRequest } from 'src/app/shared/models/requests/edit-nav-title-request.model';
import { CreateShoppinglist, UpdateShoppinglist } from 'src/app/shoppinglists/actions/list-shoppinglists-api.actions';
import { ShoppinglistsState } from 'src/app/shoppinglists/reducers/shoppinglists.reducer';

import { letterPatternValidator } from '../../form-validators/chars-pattern-validator';
import { DialogRenameData } from '../../models/dialog-rename-data.model';
import { CreateFridgeRequest } from '../../models/requests/create-fridge-request.model';
import { CreateShoppinglistRequest } from '../../models/requests/create-shoppinglist-request.model';

@Component({
  selector: 'app-create-rename-list-modal',
  templateUrl: './create-rename-list-modal.component.html',
  styleUrls: ['./create-rename-list-modal.component.scss']
})
export class CreateRenameListModalComponent implements OnInit {

  getFirstUrlSegment$: Observable<string> = this.store.pipe(select(getFirstUrlSegment));

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogRenameData,
    private store: Store<FridgesState | ShoppinglistsState | BaseAppState>,
    public dialogRef: MatDialogRef<CreateRenameListModalComponent>,
  ) { }

  form: FormGroup = new FormGroup({
    label: new FormControl('', [
      Validators.required,
      letterPatternValidator
    ]),
  });

  public ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    if (this.data.data !== null) {
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

  public handleCreateFridgeClick(): void {
    if (!this.form.valid) {
      return;
    }
    const createRequest: CreateFridgeRequest = {
      name: this.form.controls.label.value,
    };
    this.store.dispatch(new CreateFridge(createRequest));
    this.dialogRef.close();
  }

  public handleCreateShoppinglistClick(): void {
    if (!this.form.valid) {
      return;
    }
    const createRequest: CreateShoppinglistRequest = {
      name: this.form.controls.label.value,
    };
    this.store.dispatch(new CreateShoppinglist(createRequest));
    this.dialogRef.close();
  }

  public handleCancelClick(): void {
    this.dialogRef.close();
  }

}
