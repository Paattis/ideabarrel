import { useContext } from 'react';
import { customFetch } from '../api';
import { MainContext } from '../contexts/MainContext';
import { BASE_URL } from '../utils/constants';

export const useLike = () => {
  const { user } = useContext(MainContext);

  const authorizationHeaders = {
    Authorization: 'Bearer ' + user?.token,
  };

  // Get all likess
  const getAllLikes = async () => {
    const options = {
      headers: { ...authorizationHeaders },
    };
    return await customFetch(BASE_URL + 'likes', options);
  };

  // Get idea likes by the idea id
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

  // Create new like
  const postLike = async (ideaId) => {
    const options = {
      method: 'POST',
      headers: { ...authorizationHeaders },
    };
    return await customFetch(`${BASE_URL}likes/idea/${ideaId}`, options);
  };

  // Delete existing like
  const deleteLike = async (ideaId) => {
    const options = {
      method: 'DELETE',
      headers: { ...authorizationHeaders },
    };
    return await customFetch(`${BASE_URL}likes/idea/${ideaId}`, options);
  };

  return { getAllLikes, getLikesByIdeaId, postLike, deleteLike };
};
