import React, { useContext } from 'react';
import { Switch, Text } from 'react-native-paper';
import { PreferencesContext } from '../contexts/PreferencesContext';
import { StyleSheet, View } from 'react-native';

const ThemeToggle = () => {
  const { toggleTheme, isThemeDark } = useContext(PreferencesContext);

  return (
    <View style={styles.container}>
      <Text>Light</Text>
      <Switch value={isThemeDark} onValueChange={toggleTheme} />
      <Text>Dark</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export { ThemeToggle };
