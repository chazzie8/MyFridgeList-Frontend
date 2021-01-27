import { Component } from '@angular/core';

import { LoginFormValue } from '../login-form/login-form-value.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  constructor() { }

  public handleLoginClick(formValue: LoginFormValue): void {
    console.log(formValue);
  }
}
