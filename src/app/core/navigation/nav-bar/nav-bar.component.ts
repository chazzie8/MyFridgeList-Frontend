import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';

import { BaseAppState } from '../../router/reducers/custom-router-serializer.reducer';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  @Output() menuButtonClick = new EventEmitter<boolean>();

  constructor(
    private store: Store<BaseAppState>,
  ) { }

  public handleNavButtonClick(): void {
    this.menuButtonClick.emit(true);
  }

}
