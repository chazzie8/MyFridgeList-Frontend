import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { SignUp } from 'src/app/core/auth/actions/auth-sign-up.actions';
import { BaseAppState } from 'src/app/core/router/reducers/custom-router-serializer.reducer';
import { SignUpRequest } from 'src/app/shared/models/requests/sign-up-request.model';

import { SignUpFormValue } from '../sign-up-form/sign-up-form-value.model';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent {

  constructor(
    private store: Store<BaseAppState>
  ) { }

  public handleSignUpClick(formValue: SignUpFormValue): void {

    console.log(formValue);
    const request: SignUpRequest = {
      email: formValue.emailAddress,
      username: formValue.userName,
      password: formValue.password,
    };
    this.store.dispatch(new SignUp(request));
  }

}
