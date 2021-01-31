import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from 'src/app/shared/models/requests/login-request.model';
import { SignUpRequest } from 'src/app/shared/models/requests/sign-up-request.model';
import { LoginResponse } from 'src/app/shared/models/respones/login-response.model';
import { ApiResponse } from 'src/app/shared/models/respones/response.model';

@Injectable()
export class AuthService {

  constructor(
    @Inject('apiBaseUrl') private apiBaseUrl: string,
    private httpClient: HttpClient,
  ) {}

  public login(email: string, password: string): Observable<ApiResponse<LoginResponse>> {
    const url = `${this.apiBaseUrl}/accounts/signin`;
    const body: LoginRequest = {
      email,
      password,
    };

    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(`${email}:${password}`)).append('Content-Type', 'application/json');

    return this.httpClient.post<ApiResponse<LoginResponse>>(url, body, {
      headers,
    });
  }

  public signUp(signUpRequest: SignUpRequest): Observable<ApiResponse<{}>> {
    const url = `${this.apiBaseUrl}/accounts/signup`;
    return this.httpClient.post<ApiResponse<{}>>(url, signUpRequest);
  }
}
