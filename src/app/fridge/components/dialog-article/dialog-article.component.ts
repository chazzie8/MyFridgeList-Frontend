import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Article } from 'src/app/shared/models/article.model';
import { EditArticleRequest } from 'src/app/shared/models/requests/edit-article-request.model';

import { UpdateArticle } from '../../actions/articles-api.actions';
import { ArticlesState } from '../../reducers/articles.reducer';

@Component({
  selector: 'app-dialog-article',
  templateUrl: './dialog-article.component.html',
  styleUrls: ['./dialog-article.component.scss']
})
export class DialogArticleComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Article,
    private store: Store<ArticlesState>,
    private dialogRef: MatDialogRef<DialogArticleComponent>
  ) { }

  letterRegex = /^[a-zA-Z]+$/;
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

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form.patchValue({
      label: this.data.label,
      amount: this.data.amount,
      expiryDate: this.data.expirydate,
    });
  }


  handleUpdateClick(data: Article): void {
    if (!this.form.valid) {
      return;
    }
    const updateRequest: EditArticleRequest = {
      id: data.id,
      label: this.form.controls.label.value,
      amount: this.form.controls.amount.value,
      expirydate: this.form.controls.expiryDate.value,
      timestamp: data.timestamp,
    };
    const article = {...data, ...updateRequest};
    this.store.dispatch(new UpdateArticle(article));
    this.dialogRef.close();
  }

}
