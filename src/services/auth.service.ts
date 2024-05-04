import Cookies from 'js-cookie';
import { HttpService } from '.';
import apiRoutes from '../config/api.config';

export class AuthService {
  login = async (username: string, password: string) => {
    const http = new HttpService();
    const response: any = await http.service().push(apiRoutes.auth.login, {
      email: username,
      password,
    });

    if (!response.success) {
      return {
        status: response.status,
        message: response.message,
        data: response.data,
      };
    }

    const jwtToken = response.data?.accessToken;
    const refreshToken = response.data?.refreshToken;

    // eslint-disable-next-line
    const [header, payload, signature] = jwtToken.split('.');
    const decodedPayload = JSON.parse(atob(payload));
    const id = decodedPayload.sub;
    const roles = decodedPayload.roles;
    const expiredAt = decodedPayload.exp;
    return {
      id,
      roles,
      expiredAt,
      accessToken: jwtToken,
      refreshToken,
      status: response.status,
    };
  };

  getMe = () => {
    const accessToken = Cookies.get('currentUser'); // Get the JWT token from the cookie

    if (!accessToken) {
      // Access token not found in cookies
      throw new Error('Access token not found in cookie');
    }

    // Your JWT token parsing logic
    const [header, payload, signature] = accessToken.split('.');
    const decodedPayload = JSON.parse(atob(payload));
    const id = decodedPayload.sub;
    const roles = decodedPayload.roles;
    const expiredAt = decodedPayload.exp;

    if (expiredAt && Date.now() >= expiredAt * 1000) {
      // Token has expired
      throw new Error('Access token has expired');
    }

    // Return user data
    return {
      id,
      roles,
      expiredAt,
    };
  };

  checkLoggedIn = () => {
    const accessToken = Cookies.get('currentUser'); // Get the JWT token from the cookie

    if (!accessToken) {
      // Access token not found in cookies
      return false;
    }

    // Your JWT token parsing logic
    const [, payload] = accessToken.split('.');
    const decodedPayload = JSON.parse(atob(payload));
    const expiredAt = decodedPayload.exp;

    if (!expiredAt || Date.now() >= expiredAt * 1000) {
      // Token has expired
      return false;
    }

    // Token is valid and not expired
    return true;
  };
}
