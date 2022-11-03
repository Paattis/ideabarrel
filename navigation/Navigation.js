import React, { useCallback, useMemo, useState } from 'react';
import {
  Provider as PaperProvider,
  Appbar as AppBar,
} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PreferencesContext } from '../contexts/PreferencesContext';
import { CombinedDarkTheme, CombinedDefaultTheme } from '../theme';
import { PropTypes } from 'prop-types';
import MainScreen from '../screens/MainScreen';
import SecondScreen from '../screens/SecondScreen';

const Stack = createNativeStackNavigator();

const PaperNavigationBar = ({ navigation, back, route }) => {
  return (
    <AppBar.Header elevated>
      {back ? <AppBar.BackAction onPress={navigation.goBack} /> : null}
      <AppBar.Content title={route.name} />
    </AppBar.Header>
  );
};

const StackScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        animation: 'fade_from_bottom',
        header: (props) => <PaperNavigationBar {...props} />,
      }}
    >
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Second" component={SecondScreen} />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  const [isThemeDark, setIsThemeDark] = useState(false);
  const theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleTheme = useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );

  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <StackScreen />
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
};

PaperNavigationBar.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
  back: PropTypes.shape(),
};

export default Navigation;
