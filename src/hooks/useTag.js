import { customFetch } from '../api';
import { BASE_URL } from '../utils/constants';
import { useContext } from 'react';
import { MainContext } from '../contexts/MainContext';

export const useTag = () => {
  const { user } = useContext(MainContext);

  const authorizationHeaders = {
    Authorization: 'Bearer ' + user.token,
  };
  const getAllTags = async () => {
    const options = {
      headers: { ...authorizationHeaders },
    };
    return await customFetch(BASE_URL + 'tags?usr=1', options);
  };
  return {
    getAllTags,
  };
};
