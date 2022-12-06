import * as React from 'react';
import { MainProvider } from './src/contexts/MainContext';
import Navigator from './src/navigation/Navigator';

const App = () => {
  return (
    <>
      <MainProvider>
        <Navigator />
      </MainProvider>
    </>
  );
};

export default App;
