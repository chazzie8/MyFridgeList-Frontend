import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';

import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { LOADING_STATE_KEY } from './definitions/loading.definitions';
import { LoadingEffects } from './effects/loading.effects';
import { reducer } from './reducers/loading.reducer';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EffectsModule.forFeature([
      LoadingEffects,
    ]),
    StoreModule.forFeature(LOADING_STATE_KEY, reducer),
  ],
  declarations: [
    LoadingOverlayComponent,
  ],
  exports: [
    LoadingOverlayComponent,
  ],
})
export class LoadingModule { }
