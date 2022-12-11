import { useContext } from 'react';
import { BASE_URL } from '../utils/constants';
import { customFetch } from '../api';
import { MainContext } from '../contexts/MainContext';

export const useUser = () => {
  const { user } = useContext(MainContext);

  const authorizationHeaders = {
    Authorization: 'Bearer ' + user?.token,
  };

  // Get user by user id
  const getUserById = async (userId) => {
    const options = {
      headers: { Authorization: 'Bearer ' + user.token },
    };
    return await customFetch(`${BASE_URL}users/${userId}`, options);
  };

  // Check if email is available
  const checkEmail = async (email) => {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email }),
    };
    return await customFetch(BASE_URL + 'users/email/free', options);
  };

  // Create new user
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

  // Edit user info
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

  // Delete user
  const deleteUser = async (userId) => {
    const options = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...authorizationHeaders,
      },
    };
    return await customFetch(`${BASE_URL}users/${userId}`, options);
  };

  // Edit user's avatar image
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

  return {
    postUser,
    getUserById,
    putUser,
    deleteUser,
    putUserProfileImg,
    checkEmail,
  };
};
