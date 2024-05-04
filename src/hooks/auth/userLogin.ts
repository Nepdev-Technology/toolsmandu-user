import Cookies from 'js-cookie';
import { authService } from '../../services/index';
import { User } from '../../types/user';

export const useLogin = () => {
  const login = async (username: string, password: string) => {
    try {
      const { status, message, ...user } = await authService.login(
        username,
        password
      );

      if (status === 401 || status === 400) {
        return {
          status,
          message,
        };
      } else if (status === 200 && user) {
        Cookies.set('currentUser', JSON.stringify(user));
        return { status, message, ...user };
      } else {
        // Handle other status codes or unexpected responses
        return {
          status: 500,
          message: 'Internal server error',
        };
      }
    } catch (error) {
      // Handle any errors that occur during the login process
      return {
        status: 500,
        message: 'Internal server error',
      };
    }
  };

  return { login };
};
export const useGoogleLogin = () => {
  const googleLogin = async (user: User) => {
    if (user) {
      await Cookies.set('currentUser', JSON.stringify(user));
      return user as User;
    } else {
      throw new Error('User not found');
    }
  };

  return { googleLogin };
};
