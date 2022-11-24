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

  const getMediaById = async (mediaId) => {
    return await customFetch(BASE_URL + 'posts/' + mediaId);
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

  useEffect(() => {
    getMedia();
  }, []);

  return { media, getMedia, getMediaById, postMedia, loading };
};
