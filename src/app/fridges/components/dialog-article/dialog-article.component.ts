import { Component, Inject, Injectable, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { letterPatternValidator, numericPatternValidator } from 'src/app/shared/form-validators/chars-pattern-validator';
import { DialogData } from 'src/app/shared/models/dialog-data.model';
import { CreateArticleRequest } from 'src/app/shared/models/requests/create-article-request.model';
import { EditArticleRequest } from 'src/app/shared/models/requests/edit-article-request.model';

import { CreateArticle, UpdateArticle } from '../../actions/articles-api.actions';
import { ArticlesState } from '../../reducers/articles.reducer';

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
  selector: 'app-dialog-article',
  templateUrl: './dialog-article.component.html',
  styleUrls: ['./dialog-article.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: AppDateAdapter,
    },
  ]
})
export class DialogArticleComponent implements OnInit {

  minDate = new Date();

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private store: Store<ArticlesState>,
    private dialogRef: MatDialogRef<DialogArticleComponent>
  ) { }

  form: FormGroup = new FormGroup({
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
    if (this.data.article !== null) {
      this.form.setValue({
        label: this.data.article.label,
        amount: this.data.article.amount,
        expiryDate: this.minDate,
      });
    } else {
      this.form.setValue({
        label: null,
        amount: null,
        expiryDate: this.minDate,
      });
    }
  }

  public handleUpdateClick(data: any): void {
    if (!this.form.valid) {
      return;
    }
    const updateRequest: EditArticleRequest = {
      id: this.data.article.id,
      label: this.form.controls.label.value,
      amount: this.form.controls.amount.value,
      expirydate: this.form.controls.expiryDate.value,
    };
    const article = {...data.article, ...updateRequest};
    this.store.dispatch(new UpdateArticle(this.data.fridgeId, article));
    this.dialogRef.close();
  }

  public handleAddClick(): void {
    if (!this.form.valid) {
      return;
    }
    const addRequest: CreateArticleRequest = {
      label: this.form.controls.label.value,
      amount: this.form.controls.amount.value,
      expirydate: this.form.controls.expiryDate.value,
    };
    const article = {...addRequest};
    this.store.dispatch(new CreateArticle(this.data.fridgeId, article));
    this.dialogRef.close();
  }

  public handleCancelClick(): void {
    this.dialogRef.close();
  }
}
