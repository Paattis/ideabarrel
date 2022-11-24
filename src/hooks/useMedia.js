import { useEffect, useState } from 'react';
import { customFetch } from '../api';
import { BASE_URL } from '../utils/constants';

export const useMedia = () => {
  const [media, setMedia] = useState([]);

  const getMedia = async () => {
    const media = await customFetch(BASE_URL + 'posts');
    setMedia(media);
  };

  useEffect(() => {
    getMedia();
  }, []);

  return { media, getMedia };
};
