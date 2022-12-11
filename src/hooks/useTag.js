import { customFetch } from '../api';
import { BASE_URL } from '../utils/constants';
import { useContext, useEffect, useState } from 'react';
import { MainContext } from '../contexts/MainContext';

export const useTag = () => {
  const [tags, setTags] = useState();
  const { updateIdeas, updateTags, user } = useContext(MainContext);

  const authorizationHeaders = {
    Authorization: 'Bearer ' + user?.token,
  };

  // Get all of the existing tags, and include users who have subscribed to them
  const getAllTags = async () => {
    const options = {
      headers: { ...authorizationHeaders },
    };
    const tag = await customFetch(BASE_URL + 'tags?usr=1', options);
    setTags(tag);
  };

  const postTag = async (data) => {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...authorizationHeaders,
      },
      body: JSON.stringify({ name: data.name, description: data.description }),
    };
    return await customFetch(BASE_URL + 'tags', options);
  };

  // Subscribe user to specific tag
  const postUserTag = async (userId, tagId) => {
    const options = {
      method: 'POST',
      headers: { ...authorizationHeaders },
    };
    return await customFetch(
      `${BASE_URL}tags/${tagId}/user/${userId}`,
      options
    );
  };

  // Unsubscribe user from specific tag
  const deleteUserTag = async (userId, tagId) => {
    const options = {
      method: 'DELETE',
      headers: { ...authorizationHeaders },
    };
    return await customFetch(
      `${BASE_URL}tags/${tagId}/user/${userId}`,
      options
    );
  };
  useEffect(() => {
    getAllTags();
  }, [updateIdeas, updateTags]);

  return {
    tags,
    getAllTags,
    postUserTag,
    postTag,
    deleteUserTag,
  };
};
