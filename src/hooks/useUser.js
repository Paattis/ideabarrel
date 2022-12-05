import { useContext } from 'react';
import { BASE_URL } from '../utils/constants';
import { customFetch } from '../api';
import { MainContext } from '../contexts/MainContext';

export const useUser = () => {

  const { user } = useContext(MainContext);

  const authorizationHeaders = {
    Authorization: 'Bearer ' + user.token,
  };

  const getUserById = async (userId) => {
    const options = {
      headers: { Authorization: 'Bearer ' + user.token },
    };
    return await customFetch(`${BASE_URL}users/${userId}`, options);
  };

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
      headers: {
        Accept: 'multipart/form-data',
        'Content-Type': 'multipart/form-data',
        ...authorizationHeaders,
      },
      body: data,
    };
    return await customFetch(BASE_URL + 'users', options);
  };

  const putUser = async (data, userId) => {
    const options = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...authorizationHeaders,
      },
      body: JSON.stringify(data),
    };
    return await customFetch(`${BASE_URL}users/${userId}`, options);
  };

  const putUserProfileImg = async (data, userId) => {
    const options = {
      method: 'PUT',
      headers: {
        Accept: 'multipart/form-data',
        'Content-Type': 'multipart/form-data',
        ...authorizationHeaders,
      },
      body: data,
    };
    return await customFetch(`${BASE_URL}users/${userId}/img`, options);
  };

  return { postUser, getUserById, putUser, putUserProfileImg, checkEmail };
};
