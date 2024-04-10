import { cookies } from 'next/headers';

export const checkedLoggedInInServerComponent = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('currentUser')?.value;
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
