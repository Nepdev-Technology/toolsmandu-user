import Cookies from 'js-cookie'; // Importing the Cookies object from js-cookie

export const checkLoggedIn = () => {
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
