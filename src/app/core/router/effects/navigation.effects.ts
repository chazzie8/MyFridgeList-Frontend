import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import { GoToSelectedFridge, GoToSelectedShoppinglist, NavigationActionTypes } from '../actions/navigation.actions';
import { BaseAppState } from '../reducers/custom-router-serializer.reducer';

@Injectable()
export class NavigationEffects {

  @Effect({ dispatch: false })
  GoToDashboard$ = this.actions$.pipe(
    ofType(NavigationActionTypes.GoToDashboard),
    tap(() => this.router.navigate(['dashboard'])),
  );

  @Effect({ dispatch: false })
  GoToSelectedFridge$ = this.actions$.pipe(
    ofType(NavigationActionTypes.GoToSelectedFridge),
    tap((action: GoToSelectedFridge) => this.router.navigate(['fridges', action.fridgeId])),
  );

  @Effect({ dispatch: false })
  GoToSelectedShoppinglist$ = this.actions$.pipe(
    ofType(NavigationActionTypes.GoToSelectedShoppinglist),
    tap((action: GoToSelectedShoppinglist) => this.router.navigate(['shoppinglists', action.shoppinglistId])),
  );


  constructor(
    private actions$: Actions,
    private router: Router,
    public store: Store<BaseAppState>,
    ) { }
}
