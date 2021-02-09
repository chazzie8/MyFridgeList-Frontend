import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Login } from 'src/app/core/auth/actions/auth.actions';
import { BaseAppState } from 'src/app/core/router/reducers/custom-router-serializer.reducer';
import { EMAIL_PATTERN } from 'src/app/shared/form-validators/email-pattern-validator';
import { LoginRequest } from 'src/app/shared/models/requests/login-request.model';

import { LoginFormValue } from '../login-form/login-form-value.model';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  constructor(
    private store: Store<BaseAppState>
  ) { }

  public handleLoginClick(formValue: LoginFormValue): void {
    let request: LoginRequest;

    if (formValue.emailAddress.match(EMAIL_PATTERN)) {
      request = {
        username: '',
        email: formValue.emailAddress,
        password: formValue.password,
      };
    } else {
      request = {
        username: formValue.emailAddress,
        email: '',
        password: formValue.password,
      };
    }

    this.store.dispatch(new Login(request));
  }
}
