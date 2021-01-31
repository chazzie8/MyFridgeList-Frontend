export interface LoginResponse {
  token: string;
  userId: string;
  username: string;
  validFrom: string;
  expiredAt: string;
  succeeded: boolean;
}
