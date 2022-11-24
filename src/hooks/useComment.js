import { customFetch } from '../api';
import { BASE_URL } from '../utils/constants';

export const useComment = () => {
  const getCommentByPost = async (postId) => {
    return await customFetch(`${BASE_URL}comments/post/${postId}`);
  };

  const postComment = async (data, postId) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment: data.comment, post_id: postId }),
    };

    return await customFetch(BASE_URL + 'comments', options);
  };

  return { getCommentByPost, postComment };
};
