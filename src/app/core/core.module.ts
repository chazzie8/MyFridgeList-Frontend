import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import {
  CreateRenameListModalComponent,
} from '../shared/components/create-rename-list-modal/create-rename-list-modal.component';
import { MaterialModule } from '../shared/material.module';
import { AuthModule } from './auth/auth.module';
import { routes } from './core.routes';
import { FooterComponent } from './footer/footer.component';
import { NavBarTitleComponent } from './navigation/nav-bar-title/nav-bar-title.component';
import { NavBarComponent } from './navigation/nav-bar/nav-bar.component';
import { NavToolbarComponent } from './navigation/nav-toolbar/nav-toolbar.component';
import { SideNavBarListComponent } from './navigation/side-nav-bar-list/side-nav-bar-list.component';
import { SideNavBarComponent } from './navigation/side-nav-bar/side-nav-bar.component';
import { RouterStateModule } from './router/router-state.module';
import { StartComponent } from './start/start.component';


@NgModule({
  declarations: [
    StartComponent,
    NavToolbarComponent,
    NavBarComponent,
    NavBarTitleComponent,
    SideNavBarComponent,
    SideNavBarListComponent,
    FooterComponent,
    CreateRenameListModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    AuthModule,
    RouterModule.forChild(routes),
    RouterStateModule.forRoot(),
  ],
  exports: [
    StartComponent,
    NavToolbarComponent,
    NavBarComponent,
    NavBarTitleComponent,
    SideNavBarComponent,
    SideNavBarListComponent,
    FooterComponent,
    CreateRenameListModalComponent,
  ],
})
export class CoreModule { }
