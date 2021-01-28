import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { BaseAppState } from 'src/app/core/router/reducers/custom-router-serializer.reducer';

import { SessionExpired } from '../actions/auth.actions';
import { getToken } from '../selectors/auth.selectors';

@Injectable()
export class AuthTokenInvalidInterceptor implements HttpInterceptor {

  constructor(private store: Store<BaseAppState>) {}

  public intercept(
    // tslint:disable-next-line:no-any
    request: HttpRequest<any>,
    next: HttpHandler,
    // tslint:disable-next-line:no-any
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      // tslint:disable-next-line: deprecation
      tap(
        undefined,
        // tslint:disable-next-line: no-any
        (err: any) => this.handleSessionExpired(err),
      ),
    );
  }

  // tslint:disable-next-line: no-any
  private handleSessionExpired(err: any): void {
    this.store.pipe(select(getToken)).pipe(
      take(1),
    ).subscribe((token) => {
      if (token && err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.store.dispatch(new SessionExpired());
        }
      }
    });
  }

}
