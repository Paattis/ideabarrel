import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';
import { CombinedDarkTheme, CombinedDefaultTheme } from '../theme';
import { PreferencesContext } from '../contexts/PreferencesContext';

const ScreenWrapper = ({
  children,
  style,
  contentContainerStyle,
  withScrollView = false,
  ...rest
}) => {
  const { isThemeDark } = useContext(PreferencesContext);
  const theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const containerStyle = [
    styles.container,
    {
      backgroundColor: theme.colors.background,
    },
  ];

  return (
    <>
      {withScrollView ? (
        <ScrollView
          {...rest}
          contentContainerStyle={contentContainerStyle}
          showsVerticalScrollIndicator={false}
          style={[containerStyle, style]}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[containerStyle, style]}>{children}</View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

ScreenWrapper.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  withScrollView: PropTypes.bool,
  contentContainerStyle: PropTypes.object,
};

export default ScreenWrapper;
