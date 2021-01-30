import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SignUpRequest } from 'src/app/shared/models/requests/sign-up-request.model';
import { LoginResponse } from 'src/app/shared/models/respones/login-response.model';
import { ApiResponse } from 'src/app/shared/models/respones/response.model';

@Injectable()
export class MockAuthService {

  // tslint:disable-next-line:variable-name
  public login(_email: string, _password: string): Observable<ApiResponse<LoginResponse>> {
    const res: ApiResponse<LoginResponse> = {
      success: true,
      validationErrors: [],
      data: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdDEuY29tIiwiaXNzIjoibXkuZnJpZGdlLmxpc3QiLCJzdWIiOiIxOTM4YmFhOS0yN2RjLTQ3NjItYWE3Yy0yNjczYjJmNTA0YjYiLCJqdGkiOiIwZDhkY2Q2NC0wMTlhLTRmODctYjJjMi0xNjFlNWU5NjQwNWUiLCJuYmYiOjE2MTE2MTM2NzksImV4cCI6MTYxMTYxNDAzOSwiYXVkIjoibXkuZnJpZGdlLmxpc3QifQ.QAm7MSTObV7VrtBUR2e5_QHc_kKTx5XCWnOWw1tnATM',
        userId: '1938baa9-27dc-4762-aa7c-2673b2f504b6',
        username: 'Michael',
        validFrom: '0001-01-01T00:00:00',
        expiredAt: '2025-01-25T22:33:59Z',
        succeeded: true,
      },
    };
    return of(res).pipe(delay(1000));
  }

  // tslint:disable-next-line:variable-name
  signUp(_signUpRequest: SignUpRequest): Observable<ApiResponse<{}>> {
    const res: ApiResponse<{}> = {
      success: true,
      validationErrors: [],
      data: {},
    };
    return of(res).pipe(delay(1000));
  }
}
