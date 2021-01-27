import { Routes } from '@angular/router';

import { LoginPageComponent } from './components/login/login-page/login-page.component';
import { SignUpPageComponent } from './components/sign-up/sign-up-page/sign-up-page.component';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginPageComponent,
      },
      {
        path: 'signup',
        component: SignUpPageComponent,
      },
    ],
  }
];
