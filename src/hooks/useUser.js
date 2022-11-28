import { BASE_URL } from '../utils/constants';
import { customFetch } from '../api';

export const useUser = () => {
  const checkEmail = async (email) => {
    const stump = async () => {
      // This is stump request, replace with code
      // thats commented out bellow, when ready.
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ free: Math.random() > 0.5 }); // :)
        }, 200);
      });
    };
    return await stump();
    // const options = {
    //   method: 'POST',
    //   body: { email }
    // }
    // return await customFetch(BASE_URL + 'users/email/free', options)
  };

  const postUser = async (data) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: data,
    };
    return await customFetch(BASE_URL + 'users', options);
  };

  const getUserById = async (userId) => {
    return await customFetch(`${BASE_URL}users/${userId}`);
  };

  const putUser = async (data) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    };
    return await customFetch(BASE_URL + 'users', options);
  };

  return { postUser, getUserById, putUser, checkEmail };
};
