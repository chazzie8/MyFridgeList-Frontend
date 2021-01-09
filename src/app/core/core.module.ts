import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialModule } from '../shared/material.module';
import { NavBarListComponent } from './navigation/nav-bar-list/nav-bar-list.component';
import { NavBarComponent } from './navigation/nav-bar/nav-bar.component';
import { RouterStateModule } from './router/router-state.module';


@NgModule({
  declarations: [
    NavBarComponent,
    NavBarListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    MaterialModule,
    RouterStateModule.forRoot(),
  ],
  exports: [
    NavBarComponent,
    NavBarListComponent,
  ],
})
export class CoreModule { }
