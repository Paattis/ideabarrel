import * as React from 'react';
import { PropTypes } from 'prop-types';
import { Appbar as AppBar } from 'react-native-paper';
import { UserDetails } from '../components';
import { MainContext } from '../contexts/MainContext';

const PaperNavigationBar = ({ navigation, back, route }) => {
  const { user } = React.useContext(MainContext);

  return (
    <AppBar.Header elevated mode="small">
      {back ? <AppBar.BackAction onPress={navigation.goBack} /> : null}
      <AppBar.Content title={route.name} />
      {route.name === 'Main' && (
        <UserDetails avatarPosition="right" posterId={user.id} />
      )}
    </AppBar.Header>
  );
};

PaperNavigationBar.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
  back: PropTypes.shape(),
};

export default PaperNavigationBar;
