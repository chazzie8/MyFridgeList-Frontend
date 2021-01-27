import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './../shared/material.module';
import { routes } from './auth-ui.routes';
import { LoginFormComponent } from './components/login/login-form/login-form.component';
import { LoginPageComponent } from './components/login/login-page/login-page.component';
import { SignUpConfirmPageComponent } from './components/sign-up-confirm-page/sign-up-confirm-page.component';
import { SignUpFormComponent } from './components/sign-up/sign-up-form/sign-up-form.component';
import { SignUpPageComponent } from './components/sign-up/sign-up-page/sign-up-page.component';

@NgModule ({
  declarations: [
    SignUpPageComponent,
    SignUpFormComponent,
    LoginPageComponent,
    LoginFormComponent,
    SignUpConfirmPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class AuthUIModule { }
