import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { isLoggedIn } from './core/auth/selectors/auth.selectors';
import { getIsLoading } from './core/loading/selectors/loading.selectors';
import { BaseAppState } from './core/router/reducers/custom-router-serializer.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MyFridgeList-Frontend';

  isLoggedIn$: Observable<boolean> = this.store.pipe(select(isLoggedIn));
  loading$: Observable<boolean> = this.store.pipe(select(getIsLoading));

  constructor(
    private store: Store<BaseAppState>
  ) { }
}
