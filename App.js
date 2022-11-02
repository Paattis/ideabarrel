import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import Navigation from './navigation/Navigation';

const App = () => {
  return (
    <>
      <Navigation />
      <StatusBar style="auto" />
    </>
  );
};

export default App;
