import { LoginRequest } from 'src/app/shared/models/requests/login-request.model';
import { LoginResponse } from 'src/app/shared/models/respones/login-response.model';

export enum AuthActionTypes {
  Login = '[Auth API] Login',
  LoginSuccess = '[Auth API] Login Success',
  SessionExpired = '[Auth API] Session expired',
  Logout = '[Drawer Component API] Logout',
  DeleteUser = '[Auth API] Delete User',
  DeleteUserSuccess = '[Auth API] Delete User Success',
}

export class Login {
  readonly type = AuthActionTypes.Login;

  constructor(public payload: LoginRequest) { }
}

export class LoginSuccess {
  readonly type = AuthActionTypes.LoginSuccess;

  constructor(public loginResponse: LoginResponse) { }
}

export class SessionExpired {
  readonly type = AuthActionTypes.SessionExpired;
}

export class Logout {
  readonly type = AuthActionTypes.Logout;
}

export class DeleteUser {
  readonly type = AuthActionTypes.DeleteUser;
}

export class DeleteUserSuccess {
  readonly type = AuthActionTypes.DeleteUserSuccess;
}

export type AuthActions =
  | Login
  | LoginSuccess
  | SessionExpired
  | Logout
  | DeleteUser
  | DeleteUserSuccess
;
