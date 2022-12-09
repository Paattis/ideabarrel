import { useContext, useEffect, useState } from 'react';
import { customFetch } from '../api';
import { MainContext } from '../contexts/MainContext';
import { BASE_URL } from '../utils/constants';

export const useRole = () => {
  const [roles, setRoles] = useState([]);

  const { user } = useContext(MainContext);

  const authorizationHeaders = {
    Authorization: 'Bearer ' + user?.token,
  };

  const getRoles = async () => {
    const options = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...authorizationHeaders,
      },
    };
    const roles = await customFetch(BASE_URL + 'roles', options);
    setRoles(roles);
  };

  useEffect(() => {
    getRoles();
  }, []);

  return { roles, getRoles };
};
