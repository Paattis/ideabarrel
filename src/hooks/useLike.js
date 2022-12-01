import { useContext } from 'react';
import { customFetch } from '../api';
import { MainContext } from '../contexts/MainContext';
import { BASE_URL } from '../utils/constants';

export const useLike = () => {
  const { user } = useContext(MainContext);

  const authorizationHeaders = {
    Authorization: 'Bearer ' + user.token,
  };

  const getAllLikes = async () => {
    const options = {
      headers: { ...authorizationHeaders },
    };
    return await customFetch(BASE_URL + 'likes', options);
  };

  const getLikesByIdeaId = async (ideaId) => {
    const options = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...authorizationHeaders,
      },
    };
    return await customFetch(`${BASE_URL}likes/idea/${ideaId}`, options);
  };

  const postLike = async (ideaId) => {
    const options = {
      method: 'POST',
      headers: { ...authorizationHeaders },
    };
    return await customFetch(`${BASE_URL}likes/idea/${ideaId}`, options);
  };

  const deleteLike = async (ideaId) => {
    const options = {
      method: 'DELETE',
      headers: { ...authorizationHeaders },
    };
    return await customFetch(`${BASE_URL}likes/idea/${ideaId}`, options);
  };

  return { getAllLikes, getLikesByIdeaId, postLike, deleteLike };
};
