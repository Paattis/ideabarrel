import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import MainScreen from './screens/MainScreen';
import AppContainer from './components/AppContainer';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <AppContainer>
      <NavigationContainer>
        <MainScreen />
        <StatusBar style="auto" />
      </NavigationContainer>
    </AppContainer>
  );
};

export default App;
