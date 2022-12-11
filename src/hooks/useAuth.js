import { customFetch } from '../api';
import { BASE_URL } from '../utils/constants';

export const useAuth = () => {
  // sing in request
  const postSignIn = async (data) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
    return await customFetch(BASE_URL + 'auth/login', options);
  };

  // Authenticate user
  const authUser = async (token) => {
    const authorizationHeaders = {
      Authorization: 'Bearer ' + token,
    };

    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...authorizationHeaders,
      },
    };
    return await customFetch(`${BASE_URL}auth/login/token`, options);
  };

  return { postSignIn, authUser };
};
