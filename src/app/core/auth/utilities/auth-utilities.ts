import jwtDecode from 'jwt-decode';

// tslint:disable-next-line:ban-types
export function decodeToken(token: string): Object | null {
  try {
    return jwtDecode(token);
  } catch (e) {
    console.log('error decoding token', e);
    return null;
  }
}

// tslint:disable-next-line:no-any
export function getUserIdFromToken(decodedToken: any): string | null {
  if (!decodedToken) {
    return null;
  }
  return decodedToken.identity || null;
}
