import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AUTH_UI_PATHS } from 'src/app/auth-ui/definitions/auth-ui-navigations.definitions';
import { BaseAppState } from 'src/app/core/router/reducers/custom-router-serializer.reducer';

import { isLoggedIn } from '../selectors/auth.selectors';

@Injectable()
export class LoggedInGuard implements CanActivate {

  isLoggedIn$ = this.store.pipe(select(isLoggedIn));

  constructor(
    private router: Router,
    private store: Store<BaseAppState>,
  ) {}

  // tslint:disable-next-line:variable-name
  public canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree {
    return this.isLoggedIn$.pipe(
      take(1),
      map(loggedIn => {
        if (loggedIn) {
          return true;
        }
        const redirectUrlTree = this.router.createUrlTree([AUTH_UI_PATHS.root.signUp]);
        return redirectUrlTree;
      }),
    );
  }

}
