import { RequestError, ValidationError } from './error.model';

export interface ApiResponse<T> {
  error?: RequestError;
  success: boolean;
  data: T;
  validationErrors: ValidationError[];
}

export function getApiResponse<T>(responseObject: unknown): ApiResponse<T> | undefined {
  // tslint:disable-next-line: no-any
  const object = responseObject as any;
  if (!object.data) {
    return undefined;
  }
  if (typeof object.success !== 'boolean') {
    return undefined;
  }
  if (Array.isArray(object.validationErrors)) {
    return undefined;
  }
  return responseObject as ApiResponse<T>;
}
