import { customFetch } from '../api';
import { BASE_URL } from '../utils/constants';

export const useLike = () => {
  const getLikesByPostId = async (postId) => {
    return await customFetch(`${BASE_URL}likes/post/${postId}`);
  };

  const postLike = async (postId) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId }),
    };
    return await customFetch(BASE_URL + 'likes', options);
  };

  const deleteLike = async (postId) => {
    const options = {
      method: 'DELETE',
    };
    return await customFetch(`${BASE_URL}likes/post/${postId}`, options);
  };

  return { getLikesByPostId, postLike, deleteLike };
};
