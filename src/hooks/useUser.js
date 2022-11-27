import { BASE_URL } from '../utils/constants';
import { customFetch } from '../api';

export const useUser = () => {
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

  return { postUser, getUserById, putUser };
};
