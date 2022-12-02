import { useContext } from 'react';
import { BASE_URL } from '../utils/constants';
import { customFetch } from '../api';
import { MainContext } from '../contexts/MainContext';

export const useUser = () => {
  const { user } = useContext(MainContext);

  const authorizationHeaders = {
    Authorization: 'Bearer ' + user.token,
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

  const getUserById = async (userId) => {
    const options = {
      headers: { Authorization: 'Bearer ' + user.token },
    };
    return await customFetch(`${BASE_URL}users/${userId}`, options);
  };

  const putUser = async (data) => {
    const options = {
      method: 'PUT',
      headers: {
        Accept: 'multipart/form-data',
        'Content-Type': 'multipart/form-data',
        ...authorizationHeaders,
      },
      body: data,
    };
    return await customFetch(BASE_URL + 'users', options);
  };

  return { postUser, getUserById, putUser };
};
