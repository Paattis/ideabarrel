import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import MainScreen from './screens/MainScreen';
import AppContainer from './components/AppContainer';

const App = () => {
  return (
    <AppContainer>
      <MainScreen />
      <StatusBar style="auto" />
    </AppContainer>
  );
};

export default App;
