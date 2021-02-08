import { ApiResponse } from 'src/app/shared/models/respones/response.model';

export enum ApiErrorActionTypes {

  ApiError = '[API] Api Error',
}

export class ApiError {
  readonly type = ApiErrorActionTypes.ApiError;

  constructor(public response: ApiResponse<any>) { }
}

export type ApiErrorActions =
  | ApiError
;
