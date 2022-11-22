import { customFetch } from '../api';
import { BASE_URL } from '../utils/constants';

export const useSignIn = () => {
  const postSignIn = async (data) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
    return await customFetch(BASE_URL + 'auth/login', options);
  };
  return { postSignIn };
};
