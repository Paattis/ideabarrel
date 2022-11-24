import React, { createContext, useState } from 'react';
import { PropTypes } from 'prop-types';

const MainContext = createContext({});

const MainProvider = ({ children }) => {
  const [signedIn, setSignedIn] = useState(true);

  return (
    <MainContext.Provider value={{ signedIn, setSignedIn }}>
      {children}
    </MainContext.Provider>
  );
};

MainProvider.propTypes = {
  children: PropTypes.node,
};

export { MainContext, MainProvider };
