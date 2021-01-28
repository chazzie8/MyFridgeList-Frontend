import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { BaseAppState } from 'src/app/core/router/reducers/custom-router-serializer.reducer';

import { DASHBOARD_ROUTER_KEY } from '../../router/definitions/router.definitions';
import { isLoggedIn } from '../selectors/auth.selectors';

@Injectable()
export class LoggedOutGuard implements CanActivate {

  isLoggedIn$: Observable<boolean> = this.store.pipe(select(isLoggedIn));

  constructor(
    private router: Router,
    private store: Store<BaseAppState>,
  ) {}

  // tslint:disable-next-line:variable-name
  public canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree {
    return this.isLoggedIn$.pipe(
      take(1),
      map(loggedIn => {
        if (!loggedIn) {
          return true;
        }
        const redirectUrlTree = this.router.createUrlTree([DASHBOARD_ROUTER_KEY]);
        return redirectUrlTree;
      }),
    );
  }

}
