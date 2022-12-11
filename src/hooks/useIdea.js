import { useContext, useEffect, useState } from 'react';
import { customFetch } from '../api';
import { MainContext } from '../contexts/MainContext';
import { BASE_URL } from '../utils/constants';

export const useIdea = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);

  const { updateIdeas, updateTags, user, ideaSortOrder } =
    useContext(MainContext);

  const authorizationHeaders = {
    Authorization: 'Bearer ' + user?.token,
  };

  // Get ideas by sort order
  const getIdeas = async () => {
    const options = {
      headers: { ...authorizationHeaders },
    };
    setLoading(true);
    const idea = await customFetch(
      `${BASE_URL}ideas/${ideaSortOrder}`,
      options
    );
    setIdeas(idea);
    setLoading(false);
  };

  // Get idea by idea id
  const getIdeaById = async (ideaId) => {
    const options = {
      headers: { ...authorizationHeaders },
    };
    return await customFetch(`${BASE_URL}ideas/${ideaId}`, options);
  };

  // Create new idea
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
    const res = await customFetch(BASE_URL + 'ideas', options);
    return res;
  };

  // Update idea
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
    const res = await customFetch(`${BASE_URL}ideas/${ideaId}`, options);
    return res;
  };

  // Delete idea
  const deleteIdea = async (ideaId) => {
    const options = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...authorizationHeaders,
      },
    };
    return await customFetch(`${BASE_URL}ideas/${ideaId}`, options);
  };

  useEffect(() => {
    getIdeas();
  }, [updateIdeas, updateTags]);

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
