import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CreateArticle } from 'src/app/fridges/actions/articles-api.actions';
import { ArticlesState } from 'src/app/fridges/reducers/articles.reducer';
import { getFridges } from 'src/app/fridges/selectors/fridges.selector';
import { letterPatternValidator } from 'src/app/shared/form-validators/chars-pattern-validator';
import { Fridge } from 'src/app/shared/models/fridge.model';
import { Item } from 'src/app/shared/models/item.model';
import { CreateArticleRequest } from 'src/app/shared/models/requests/create-article-request.model';

import { DeleteItem } from '../../actions/items-api.actions';
import { DialogAlertComponent } from '../dialog-alert/dialog-alert.component';

export interface DialogFridgeItemData {
  items: Item[];
  shoppinglistId: string;
}

@Component({
  selector: 'app-dialog-fridge-item',
  templateUrl: './dialog-fridge-item.component.html',
  styleUrls: ['./dialog-fridge-item.component.scss']
})
export class DialogFridgeItemComponent implements OnInit {

  fridges$: Observable<Fridge[]> = this.store.pipe(select(getFridges));
  index = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogFridgeItemData,
    private store: Store<ArticlesState>,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<DialogFridgeItemComponent>
  ) { }

  form: FormGroup = new FormGroup({
    fridgeSelect: new FormControl('', [
      Validators.required
    ]),
    label: new FormControl('', [
      Validators.required,
      letterPatternValidator
    ]),
    amount: new FormControl('', [
      Validators.required,
      letterPatternValidator
    ]),
    expiryDate: new FormControl('', [
      Validators.required
    ]),
  });

  public ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.form.get('label').setValue(this.data.items[this.index].label);
    this.form.get('amount').reset();
    this.form.get('expiryDate').reset();
  }

  public handleAddClick(): void {
    const fridge: Fridge = this.form.get('fridgeSelect').value;

    const addRequest: CreateArticleRequest = {
      label: this.form.controls.label.value,
      amount: this.form.controls.amount.value,
      expirydate: this.form.controls.expiryDate.value,
    };
    const article = {...addRequest};
    this.store.dispatch(new CreateArticle(fridge.id, article));
    this.store.dispatch(new DeleteItem(this.data.shoppinglistId, this.data.items[this.index].id));

    if (this.index < this.data.items.length - 1){
      this.index += 1;
      this.initForm();
    } else {
      this.dialogRef.close();
    }
  }

  public handleCancelClick(): void {
    this.dialog.open(DialogAlertComponent, {
      disableClose: true
    }).afterClosed().subscribe((close: boolean) => {
      if (close) {
        this.dialogRef.close();
      }
    });
  }

  public handleSkipClick(): void {
    if (this.index < this.data.items.length - 1){
      this.index += 1;
      this.initForm();
    }
  }

}
