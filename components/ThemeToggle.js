import React, { useContext } from 'react';
import { Switch } from 'react-native-paper';
import { PreferencesContext } from '../contexts/PreferencesContext';

const ThemeToggle = () => {
  const { toggleTheme, isThemeDark } = useContext(PreferencesContext);

  return <Switch value={isThemeDark} onValueChange={toggleTheme} />;
};

export default ThemeToggle;
