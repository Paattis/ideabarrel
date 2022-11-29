import { useContext, useEffect, useState } from 'react';
import { customFetch } from '../api';
import { MainContext } from '../contexts/MainContext';
import { BASE_URL } from '../utils/constants';

export const useIdea = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);

  const { updateIdeas, user } = useContext(MainContext);

  const authorizationHeaders = {
    Authorization: 'Bearer ' + user.token,
  };

  const getIdeas = async () => {
    const options = {
      headers: { ...authorizationHeaders },
    };
    console.log('here', user.token);
    setLoading(true);
    const media = await customFetch(BASE_URL + 'ideas', options);
    setIdeas(media);
    setLoading(false);
  };

  const getIdeaById = async (ideaId) => {
    const options = {
      headers: { ...authorizationHeaders },
    };
    return await customFetch(BASE_URL + 'ideas/' + ideaId, options);
  };

  const postIdea = async (data) => {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...authorizationHeaders,
      },
      body: JSON.stringify(data),
    };
    setLoading(true);
    const res = await customFetch(BASE_URL + 'ideas', options);
    if (res) setLoading(false);
    return res;
  };

  const putIdea = async (data, ideaId) => {
    const options = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...authorizationHeaders,
      },
      body: JSON.stringify(data),
    };
    setLoading(true);
    const res = await customFetch(`${BASE_URL}ideas/${ideaId}`, options);
    if (res) setLoading(false);
    return res;
  };

  const deleteIdea = async (ideaId) => {
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
    };
    return await customFetch(`${BASE_URL}ideas/${ideaId}`, options);
  };

  useEffect(() => {
    getIdeas();
  }, [updateIdeas]);

  return {
    loading,
    ideas,
    getIdeas,
    getIdeaById,
    postIdea,
    putIdea,
    deleteIdea,
  };
};
