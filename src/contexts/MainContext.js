import React, { createContext, useState } from 'react';
import { PropTypes } from 'prop-types';

const MainContext = createContext({});

const MainProvider = ({ children }) => {
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState({});

  const [updateIdeas, setUpdateIdeas] = useState(0);
  const [likeUpdate, setLikeUpdate] = useState(0);

  return (
    <MainContext.Provider
      value={{
        signedIn,
        setSignedIn,
        user,
        setUser,
        updateIdeas,
        setUpdateIdeas,
        setLikeUpdate,
        likeUpdate,
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
