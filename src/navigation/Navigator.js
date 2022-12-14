import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { PreferencesContext } from '../contexts/PreferencesContext';
import { CombinedDarkTheme, CombinedDefaultTheme } from '../theme';
import { StatusBar } from 'expo-status-bar';
import StackScreen from './StackScreen';
import * as SecureStore from 'expo-secure-store';

const Navigator = () => {
  const [isThemeDark, setIsThemeDark] = useState(false);
  const theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleTheme = useCallback(async () => {
    const value = JSON.stringify(!isThemeDark);
    await SecureStore.setItemAsync('isThemeDark', value);

    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );

  useEffect(() => {
    const loadTheme = async () => {
      const value = await SecureStore.getItemAsync('isThemeDark');
      if (value !== null) setIsThemeDark(JSON.parse(value));
    };
    loadTheme();
  }, []);

  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <StackScreen />
          <StatusBar style={isThemeDark ? 'light' : 'dark'} />
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
};

export default Navigator;
