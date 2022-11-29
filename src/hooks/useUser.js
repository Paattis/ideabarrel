import { useContext } from 'react';
import { BASE_URL } from '../utils/constants';
import { customFetch } from '../api';
import { MainContext } from '../contexts/MainContext';

export const useUser = () => {
  const { user } = useContext(MainContext);

  const postUser = async (data) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
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
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    };
    return await customFetch(BASE_URL + 'users', options);
  };

  return { postUser, getUserById, putUser };
};
