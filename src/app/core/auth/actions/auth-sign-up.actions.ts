import { SignUpRequest } from 'src/app/shared/models/requests/sign-up-request.model';

export enum SignUpActionTypes {
  SignUp = '[SignUp] SignUp',
  SignUpSuccess = '[SignUp API] SignUp Success',
}

export class SignUp {
  readonly type = SignUpActionTypes.SignUp;

  constructor(public payload: SignUpRequest) { }
}

export class SignUpSuccess {
  readonly type = SignUpActionTypes.SignUpSuccess;
}

export type SignUpAction =
  | SignUp
  | SignUpSuccess
;
