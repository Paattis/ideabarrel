import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { PropTypes } from 'prop-types';
import { CombinedDarkTheme, CombinedDefaultTheme } from '../theme';
import { PreferencesContext } from '../contexts/PreferencesContext';

const ScreenWrapper = ({ children, style }) => {
  const { isThemeDark } = React.useContext(PreferencesContext);
  const theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const containerStyle = [
    styles.container,
    {
      backgroundColor: theme.colors.background,
    },
  ];

  return <View style={[containerStyle, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

ScreenWrapper.propTypes = {
  children: PropTypes.any,
};

export default ScreenWrapper;
