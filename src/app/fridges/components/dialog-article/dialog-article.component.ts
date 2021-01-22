import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Article } from 'src/app/shared/models/article.model';
import { CreateArticleRequest } from 'src/app/shared/models/requests/create-article-request.model';
import { EditArticleRequest } from 'src/app/shared/models/requests/edit-article-request.model';

import { CreateArticle, UpdateArticle } from '../../actions/articles-api.actions';
import { ArticlesState } from '../../reducers/articles.reducer';

export interface DialogData {
  fridgeId: string;
  article: Article;
}

@Component({
  selector: 'app-dialog-article',
  templateUrl: './dialog-article.component.html',
  styleUrls: ['./dialog-article.component.scss']
})
export class DialogArticleComponent implements OnInit {

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private store: Store<ArticlesState>,
    private dialogRef: MatDialogRef<DialogArticleComponent>
  ) { }

  letterRegex = /^[a-zA-Z_äÄöÖüÜß_ ]+$/;
  numericRegex = /^[0-9]+$/;
  form: FormGroup = new FormGroup({
    label: new FormControl('', [
      Validators.required,
      Validators.pattern(this.letterRegex)
    ]),
    amount: new FormControl('', [
      Validators.required,
      Validators.pattern(this.numericRegex)
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
        expiryDate: this.data.article.expirydate,
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
