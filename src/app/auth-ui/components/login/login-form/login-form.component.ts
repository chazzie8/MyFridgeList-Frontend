import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { GoToSignUp } from 'src/app/auth-ui/actions/auth-ui-navigation.actions';
import { BaseAppState } from 'src/app/core/router/reducers/custom-router-serializer.reducer';

import { LoginFormValue } from './login-form-value.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  // tslint:disable-next-line:no-output-rename
  @Output('login') loginEmitter = new EventEmitter<LoginFormValue>();

  hide = true;

  constructor(
    private store: Store<BaseAppState>
  ) { }

  form: FormGroup = new FormGroup({
    emailAddress: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required),
  });

  public handleLoginClick(): void {
    if (!this.form.valid) {
      return;
    }

    this.loginEmitter.emit(this.form.value);
  }

  public handleGoToSignUpClick(): void {
    this.store.dispatch(new GoToSignUp());
  }

}
