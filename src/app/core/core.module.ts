import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialModule } from '../shared/material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavBarTitleComponent } from './navigation/nav-bar-title/nav-bar-title.component';
import { NavBarComponent } from './navigation/nav-bar/nav-bar.component';
import { SideNavBarListComponent } from './navigation/side-nav-bar-list/side-nav-bar-list.component';
import { SideNavBarComponent } from './navigation/side-nav-bar/side-nav-bar.component';
import { RouterStateModule } from './router/router-state.module';


@NgModule({
  declarations: [
    NavBarComponent,
    NavBarTitleComponent,
    SideNavBarComponent,
    SideNavBarListComponent,
    DashboardComponent,
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
    NavBarTitleComponent,
    SideNavBarComponent,
    SideNavBarListComponent,
    DashboardComponent,
  ],
})
export class CoreModule { }
