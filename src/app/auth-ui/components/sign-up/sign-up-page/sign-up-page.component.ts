import { Component } from '@angular/core';
import { SignUpRequest } from 'src/app/shared/models/requests/sign-up-request.model';

import { SignUpFormValue } from '../sign-up-form/sign-up-form-value.model';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent {

  constructor() { }

  public handleSignUpClick(formValue: SignUpFormValue): void {

    console.log(formValue);
    const request: SignUpRequest = {
      email: formValue.emailAddress,
      password: formValue.password,
    };
  }

}
