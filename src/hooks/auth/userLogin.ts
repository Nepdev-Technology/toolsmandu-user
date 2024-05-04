import Cookies from 'js-cookie';
import { authService } from '../../services/index';
import { User } from '../../types/user';

export const useLogin = () => {
  const login = async (username: string, password: string) => {
    const { status, ...user } = await authService.login(username, password);
    if (status === 401) {
      return {
        status,
        message: user.message,
      };
    }
    if (user) {
      Cookies.set('currentUser', JSON.stringify(user));
    }
    return user as User;
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
