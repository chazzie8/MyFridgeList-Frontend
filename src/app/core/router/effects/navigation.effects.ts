import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import { GoToSelectedFridge, GoToSelectedShoppinglist, NavigationActionTypes } from '../actions/navigation.actions';
import { BaseAppState } from '../reducers/custom-router-serializer.reducer';
import { DASHBOARD_ROUTER_KEY, FRIDGES_ROUTER_KEY, SHOPPINGLISTS_ROUTER_KEY } from './../router.constants';

@Injectable()
export class NavigationEffects {

  @Effect({ dispatch: false })
  public goToDashboard$ = this.actions$.pipe(
    ofType(NavigationActionTypes.GoToDashboard),
    tap(() => this.router.navigate([DASHBOARD_ROUTER_KEY])),
  );

  @Effect({ dispatch: false })
  public goToSelectedFridge$ = this.actions$.pipe(
    ofType(NavigationActionTypes.GoToSelectedFridge),
    tap((action: GoToSelectedFridge) => this.router.navigate([FRIDGES_ROUTER_KEY, action.fridgeId])),
  );

  @Effect({ dispatch: false })
  public goToSelectedShoppinglist$ = this.actions$.pipe(
    ofType(NavigationActionTypes.GoToSelectedShoppinglist),
    tap((action: GoToSelectedShoppinglist) => this.router.navigate([SHOPPINGLISTS_ROUTER_KEY, action.shoppinglistId])),
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    public store: Store<BaseAppState>,
    ) { }
}
