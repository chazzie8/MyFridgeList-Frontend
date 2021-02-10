import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isLoggedIn } from 'src/app/core/auth/selectors/auth.selectors';
import { BaseAppState } from 'src/app/core/router/reducers/custom-router-serializer.reducer';

@Component({
  selector: 'app-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss'],
})
export class LoadingOverlayComponent {

  isLoggedIn$: Observable<boolean> = this.store.pipe(select(isLoggedIn));

  constructor(
    private store: Store<BaseAppState>
  ) { }
}
