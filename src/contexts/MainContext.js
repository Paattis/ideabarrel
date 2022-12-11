import React, { createContext, useState } from 'react';
import { PropTypes } from 'prop-types';
import { NEWEST_IDEAS } from '../utils/constants';

const MainContext = createContext({});

const MainProvider = ({ children }) => {
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState({});

  const [updateIdeas, setUpdateIdeas] = useState(0);
  const [updateLikes, setUpdateLikes] = useState(0);
  const [updateProfile, setUpdateProfile] = useState(0);
  const [updateTags, setUpdateTags] = useState(0);

  const [ideaSortOrder, setIdeaSortOrder] = useState(NEWEST_IDEAS);

  return (
    <MainContext.Provider
      value={{
        signedIn,
        setSignedIn,
        user,
        setUser,
        updateIdeas,
        setUpdateIdeas,
        updateLikes,
        setUpdateLikes,
        updateProfile,
        setUpdateProfile,
        ideaSortOrder,
        setIdeaSortOrder,
        updateTags,
        setUpdateTags,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

MainProvider.propTypes = {
  children: PropTypes.node,
};

export { MainContext, MainProvider };
