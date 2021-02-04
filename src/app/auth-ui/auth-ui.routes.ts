import { Routes } from '@angular/router';

import { LoggedOutGuard } from './../core/auth/guards/logged-out-guard.service';
import { LoginPageComponent } from './components/login/login-page/login-page.component';
import { SignUpConfirmPageComponent } from './components/sign-up-confirm-page/sign-up-confirm-page.component';
import { SignUpPageComponent } from './components/sign-up/sign-up-page/sign-up-page.component';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginPageComponent,
        canActivate: [LoggedOutGuard],
      },
      {
        path: 'signup',
        component: SignUpPageComponent,
        canActivate: [LoggedOutGuard],
      },
      {
        path: 'signup-confirmation',
        component: SignUpConfirmPageComponent,
        canActivate: [LoggedOutGuard],
      },
    ],
  }
];
