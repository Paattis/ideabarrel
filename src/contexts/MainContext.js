import React, { createContext, useState } from 'react';
import { PropTypes } from 'prop-types';

const MainContext = createContext({});

const MainProvider = ({ children }) => {
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState({});

  const [updateIdeas, setUpdateIdeas] = useState(0);
  const [updateLikes, setUpdateLikes] = useState(0);
  const [updateProfile, setUpdateProfile] = useState(0);

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
