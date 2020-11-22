import { NgModule } from '@angular/core';

import { MaterialModule } from './../shared/material.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    NavBarComponent,
  ],
  imports: [
    MaterialModule,
  ],
  exports: [
    NavBarComponent,
  ],
})
export class CoreModule { }
