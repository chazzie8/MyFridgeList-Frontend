import { HttpClient } from '@angular/common/http';
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

  public login(username: string, email: string, password: string): Observable<ApiResponse<LoginResponse>> {
    const url = `${this.apiBaseUrl}/account/signin`;
    const body: LoginRequest = {
      username,
      email,
      password,
    };

    return this.httpClient.post<ApiResponse<LoginResponse>>(url, body);
  }

  public signUp(signUpRequest: SignUpRequest): Observable<ApiResponse<{}>> {
    const url = `${this.apiBaseUrl}/account/signup`;
    return this.httpClient.post<ApiResponse<{}>>(url, signUpRequest);
  }

  public deleteUser(): Observable<ApiResponse<{}>> {
    const url = `${this.apiBaseUrl}/account`;
    return this.httpClient.delete<ApiResponse<{}>>(url);
  }
}
