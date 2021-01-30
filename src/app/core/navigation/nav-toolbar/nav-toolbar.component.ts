import { Component, EventEmitter, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GoToSignUp } from 'src/app/auth-ui/actions/auth-ui-navigation.actions';
import { BaseAppState } from 'src/app/core/router/reducers/custom-router-serializer.reducer';

import { Logout } from '../../auth/actions/auth.actions';
import { isLoggedIn } from './../../auth/selectors/auth.selectors';

@Component({
  selector: 'app-nav-toolbar',
  templateUrl: './nav-toolbar.component.html',
  styleUrls: ['./nav-toolbar.component.scss']
})
export class NavToolbarComponent {

  // tslint:disable-next-line:no-output-rename
  @Output('sideNav') sidenavEmitter = new EventEmitter();

  isLoggedIn$: Observable<boolean> = this.store.pipe(select(isLoggedIn));

  constructor(
    private store: Store<BaseAppState>,
  ) { }

  public handleGoToSignUpClick(): void {
    this.store.dispatch(new GoToSignUp());
  }

  public handleLogoutClick(): void {
    this.store.dispatch(new Logout());
    this.sidenavEmitter.emit();
  }
}
