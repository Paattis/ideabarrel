import * as React from 'react';
import { useContext } from 'react';
import { Text } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import { View } from 'react-native';
import { CombinedDarkTheme, CombinedDefaultTheme } from '../theme';
import { PreferencesContext } from '../contexts/PreferencesContext';

const Tags = ({ idea, styleText, tagStyle }) => {
  const { isThemeDark } = useContext(PreferencesContext);
  const theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const colorValue = {
    admin: 'red',
  };

  return (
    <View
      onStartShouldSetResponder={() => true}
      style={[
        tagStyle,
        {
          backgroundColor: colorValue[idea] ?? theme.colors.inversePrimary,
        },
      ]}
    >
      <Text style={styleText}>{idea}</Text>
    </View>
  );
};

Tags.propTypes = {
  idea: PropTypes.string,
  styleText: PropTypes.object,
  tagStyle: PropTypes.object,
};
export default Tags;
