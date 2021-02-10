import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { GoToSignUp } from 'src/app/auth-ui/actions/auth-ui-navigation.actions';

import faqs from '../../../assets/data/faqs.json';
import profiles from '../../../assets/data/profiles.json';
import promotions from '../../../assets/data/promotions.json';
import home from '../../../assets/data/start.json';
import { BaseAppState } from '../router/reducers/custom-router-serializer.reducer';

interface Profile {
  id: number;
  name: string;
  imgUrl: string;
  jobtitle: string;
  subtitle: string;
}

interface Promotion {
  id: number;
  floating: string;
  promoImgUrl: string;
  imgAltLabel: string;
  promoHeader: string;
  text: string;
}

interface Faq {
  id: number;
  question: string;
  answer: string;
}

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent {

  constructor(
    private store: Store<BaseAppState>,
  ) { }

  home = home;
  profiles: Profile[] = profiles;
  promotions: Promotion[] = promotions;
  faqs: Faq[] = faqs;

  public handleGoToSignUpClick(): void {
    this.store.dispatch(new GoToSignUp());
  }

}
