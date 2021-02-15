import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { DialogAlertComponent } from 'src/app/shared/components/dialog-alert/dialog-alert.component';
import { letterPatternValidator, numericPatternValidator } from 'src/app/shared/form-validators/chars-pattern-validator';
import { DialogData } from 'src/app/shared/models/dialog-data.model';
import { CreateArticleRequest } from 'src/app/shared/models/requests/create-article-request.model';
import { EditArticleRequest } from 'src/app/shared/models/requests/edit-article-request.model';

import { CreateArticle, UpdateArticle } from '../../actions/articles-api.actions';
import { ArticlesState } from '../../reducers/articles.reducer';

@Component({
  selector: 'app-dialog-article',
  templateUrl: './dialog-article.component.html',
  styleUrls: ['./dialog-article.component.scss'],
})
export class DialogArticleComponent implements OnInit {

  minDate = new Date();

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private store: Store<ArticlesState>,
    private dialog: MatDialog,
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

  public initForm(): void {
    if (this.data.article !== null) {
      this.form.setValue({
        label: this.data.article.label,
        amount: this.data.article.amount,
        expiryDate: this.data.article.expirydate,
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

  public handleAddAndCloseClick(): void {
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
    this.form.reset();
    this.initForm();
  }

  public handleCancelClick(): void {
    this.dialogRef.close();
  }

}
