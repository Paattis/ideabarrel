import { useEffect, useState } from 'react';
import { customFetch } from '../api';
import { BASE_URL } from '../utils/constants';

export const useMedia = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMedia = async () => {
    setLoading(true);
    const media = await customFetch(BASE_URL + 'posts');
    setMedia(media);
    setLoading(false);
  };

  const getMediaById = async (postId) => {
    return await customFetch(BASE_URL + 'posts/' + postId);
  };

  const postMedia = async (data) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
    setLoading(true);
    const res = await customFetch(BASE_URL + 'posts/', options);
    if (res) setLoading(false);
    return res;
  };

  const putMedia = async (data, postId) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    setLoading(true);
    const res = await customFetch(`${BASE_URL}posts/${postId}`, options);
    if (res) setLoading(false);
    return res;
  };

  const deleteMedia = async (postId) => {
    const options = {
      method: 'DELETE',
    };
    return await customFetch(`${BASE_URL}/posts/${postId}`, options);
  };

  useEffect(() => {
    getMedia();
  }, []);

  return {
    loading,
    media,
    getMedia,
    getMediaById,
    postMedia,
    putMedia,
    deleteMedia,
  };
};
