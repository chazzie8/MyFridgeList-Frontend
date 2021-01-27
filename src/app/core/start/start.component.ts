import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { GoToSignUp } from 'src/app/auth-ui/actions/auth-ui-navigation.actions';

import { BaseAppState } from '../router/reducers/custom-router-serializer.reducer';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent {

  constructor(
    private store: Store<BaseAppState>
  ) { }

  public handleGoToSignUpClick(): void {
    this.store.dispatch(new GoToSignUp());
  }
}
