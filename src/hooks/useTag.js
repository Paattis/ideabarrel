import { customFetch } from '../api';
import { BASE_URL } from '../utils/constants';
import { useContext, useEffect, useState } from 'react';
import { MainContext } from '../contexts/MainContext';

export const useTag = () => {
  const [tags, setTags] = useState();
  const { updateIdeas, user } = useContext(MainContext);

  const authorizationHeaders = {
    Authorization: 'Bearer ' + user.token,
  };
  const getAllTags = async () => {
    const options = {
      headers: { ...authorizationHeaders },
    };
    const tag = await customFetch(BASE_URL + 'tags?usr=1', options);
    setTags(tag);
  };
  useEffect(() => {
    getAllTags();
  }, [updateIdeas]);
  return {
    tags,
    getAllTags,
  };
};
