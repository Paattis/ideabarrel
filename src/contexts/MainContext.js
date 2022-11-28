import React, { createContext, useState } from 'react';
import { PropTypes } from 'prop-types';

const MainContext = createContext({});

const MainProvider = ({ children }) => {
  const [signedIn, setSignedIn] = useState(false);
  const [likeUpdate, setLikeUpdate] = useState(0);

  const [user, setUser] = useState({});

  return (
    <MainContext.Provider
      value={{
        signedIn,
        setSignedIn,
        user,
        setUser,
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
