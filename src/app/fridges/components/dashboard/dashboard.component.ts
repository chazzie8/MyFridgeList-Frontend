import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FridgesState } from 'src/app/fridges/reducers/fridges.reducer';
import { getFridges } from 'src/app/fridges/selectors/fridges.selector';
import { Fridge } from 'src/app/shared/models/fridge.model';

import { LoadFridgeDashboardItems } from '../../actions/dashboard-api.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  fridges$: Observable<Fridge[]> = this.store.pipe(select(getFridges));

  constructor(
    private store: Store<FridgesState>,
  ) { }

  public ngOnInit(): void {
    this.store.dispatch(new LoadFridgeDashboardItems());
  }
}
