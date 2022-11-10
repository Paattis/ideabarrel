import * as React from 'react';
import { PropTypes } from 'prop-types';
import { Appbar as AppBar } from 'react-native-paper';

const PaperNavigationBar = ({ navigation, back, route }) => {
  return (
    <AppBar.Header elevated>
      {back ? <AppBar.BackAction onPress={navigation.goBack} /> : null}
      <AppBar.Content title={route.name} />
    </AppBar.Header>
  );
};

PaperNavigationBar.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
  back: PropTypes.shape(),
};

export default PaperNavigationBar;