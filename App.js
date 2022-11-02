import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppContainer from './components/AppContainer';
import Navigation from './navigation/Navigation';

const App = () => {
  return (
    <AppContainer>
      <Navigation />
      <StatusBar style="auto" />
    </AppContainer>
  );
};

export default App;
