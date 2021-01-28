import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BaseAppState } from 'src/app/core/router/reducers/custom-router-serializer.reducer';

import { getToken } from '../selectors/auth.selectors';

const REQUEST_HEADER_AUTHORIZATION = 'Authorization';

@Injectable()
export class AuthTokenInjectorInterceptor implements HttpInterceptor {

  token: string | undefined;

  constructor(private store: Store<BaseAppState>) {
    this.observeToken();
  }

  public intercept(
    // tslint:disable-next-line:no-any
    request: HttpRequest<any>,
    next: HttpHandler,
    // tslint:disable-next-line:no-any
  ): Observable<HttpEvent<any>> {
    const updatedRequestHeaders = this.getUpdatedRequestHeaders();
    request = request.clone({
      headers: updatedRequestHeaders,
    });

    return next.handle(request);
  }

  private getUpdatedRequestHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    if (this.token) {
      headers = headers.append(REQUEST_HEADER_AUTHORIZATION, `Bearer ${this.token}`);
    }
    headers = headers
      .set('Cache-Control', 'no-cache')
      .set('Pragma', 'no-cache')
      .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
      .set('If-Modified-Since', '0');
    return headers;
  }

  private observeToken(): void {
    this.store.pipe(select(getToken)).subscribe((token) => this.token = token);
  }
}
