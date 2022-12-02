import { useContext } from 'react';
import { customFetch } from '../api';
import { MainContext } from '../contexts/MainContext';
import { BASE_URL } from '../utils/constants';

export const useComment = () => {
  const { user } = useContext(MainContext);

  const authorizationHeaders = {
    Authorization: 'Bearer ' + user.token,
  };

  const postComment = async (data, ideaId) => {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...authorizationHeaders,
      },
      body: JSON.stringify({ content: data.comment, idea_id: ideaId }),
    };
    return await customFetch(BASE_URL + 'comments', options);
  };

  // const editComment = async (data, commentId) => {
  //   const options = {
  //     method: 'PUT',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //       ...authorizationHeaders,
  //     },
  //     body: JSON.stringify(data),
  //   };
  // };

  const deleteComment = async (commentId) => {
    const options = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...authorizationHeaders,
      },
    };
    return await customFetch(`${BASE_URL}/comments/${commentId}`, options);
  };

  return { postComment, deleteComment };
};
