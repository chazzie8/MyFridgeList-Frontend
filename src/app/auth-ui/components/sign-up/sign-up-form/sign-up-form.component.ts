import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { GoToLogIn } from 'src/app/auth-ui/actions/auth-ui-navigation.actions';
import { BaseAppState } from 'src/app/core/router/reducers/custom-router-serializer.reducer';
import { emailPatternValidator } from 'src/app/shared/form-validators/email-pattern-validator';
import { matchingPasswordsValidator, passwordPatternValidator } from 'src/app/shared/form-validators/password-validator';

import { SignUpFormValue } from './sign-up-form-value.model';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent {

  // tslint:disable-next-line:no-output-rename
  @Output('signUp') signUpEmitter = new EventEmitter<SignUpFormValue>();

  hidePasswort = true;
  hidePasswordConfirmation = true;

  constructor(
    private store: Store<BaseAppState>
  ) { }

  form: FormGroup = new FormGroup({
    emailAddress: new FormControl('', [Validators.required, emailPatternValidator]),
    userName: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8), passwordPatternValidator]),
    passwordConfirmation: new FormControl('', Validators.required),
  }, {
    validators: [matchingPasswordsValidator],
  });

  get formValue(): SignUpFormValue {
    return this.form.value as SignUpFormValue;
  }
  set formValue(formValue: SignUpFormValue) {
    this.form.setValue(formValue);
  }

  public handleSignUpClick(): void {
    if (!this.form.valid) {
      return;
    }

    this.signUpEmitter.emit(this.formValue);
  }

  public handleGoToLoginClick(): void {
    this.store.dispatch(new GoToLogIn());
  }

}
