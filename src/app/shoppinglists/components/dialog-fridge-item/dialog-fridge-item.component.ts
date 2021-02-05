import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CreateArticle } from 'src/app/fridges/actions/articles-api.actions';
import { ArticlesState } from 'src/app/fridges/reducers/articles.reducer';
import { getFridges } from 'src/app/fridges/selectors/fridges.selector';
import { letterPatternValidator, numericPatternValidator } from 'src/app/shared/form-validators/chars-pattern-validator';
import { DialogFridgeItemData } from 'src/app/shared/models/dialog-fridge-item-data.model';
import { Fridge } from 'src/app/shared/models/fridge.model';
import { CreateArticleRequest } from 'src/app/shared/models/requests/create-article-request.model';

import { DeleteItem } from '../../actions/items-api.actions';
import { DialogAlertComponent } from '../dialog-alert/dialog-alert.component';

@Injectable()
export class AppDateAdapter extends NativeDateAdapter {
  format(date: Date): string {
    const day: string = date.getDate().toString();
    const month: string = (date.getMonth() + 1).toString();
    const year = date.getFullYear();
    return `${day.length > 1 ? day : '0' + day}.${month.length > 1 ? month : '0' + month}.${year}`;
  }
}

@Component({
  selector: 'app-dialog-fridge-item',
  templateUrl: './dialog-fridge-item.component.html',
  styleUrls: ['./dialog-fridge-item.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: AppDateAdapter,
    },
  ]
})
export class DialogFridgeItemComponent implements OnInit {

  fridges$: Observable<Fridge[]> = this.store.pipe(select(getFridges));
  index = 0;
  minDate = new Date();

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
      numericPatternValidator
    ]),
    expiryDate: new FormControl('', [
      Validators.required
    ]),
  });

  public ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    if (this.data.items != null) {
      this.form.patchValue({
        label: this.data.items[this.index].label,
        amount: null,
        expiryDate: new Date(),
      });
    }
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
