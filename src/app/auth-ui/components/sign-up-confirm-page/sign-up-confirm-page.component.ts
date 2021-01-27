import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { BaseAppState } from 'src/app/core/router/reducers/custom-router-serializer.reducer';

import { GoToLogIn } from '../../actions/auth-ui-navigation.actions';

@Component({
  selector: 'app-sign-up-confirm-page',
  templateUrl: './sign-up-confirm-page.component.html',
  styleUrls: ['./sign-up-confirm-page.component.scss']
})
export class SignUpConfirmPageComponent {

  constructor(
    private store: Store<BaseAppState>
  ) { }

  public handleGoToLoginClick(): void {
    this.store.dispatch(new GoToLogIn());
  }

}
