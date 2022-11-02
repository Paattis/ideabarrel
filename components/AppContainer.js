import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme } from '../theme';
import { PropTypes } from 'prop-types';

const AppContainer = (props) => {
  const scheme = useColorScheme();

  return (
    <PaperProvider theme={scheme === 'dark' ? darkTheme : lightTheme}>
      {props.children}
    </PaperProvider>
  );
};

AppContainer.propTypes = {
  children: PropTypes.any,
};

export default AppContainer;
