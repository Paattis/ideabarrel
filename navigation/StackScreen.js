import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PropTypes } from 'prop-types';
import MainScreen from '../screens/MainScreen';
import SecondScreen from '../screens/SecondScreen';
import { Appbar as AppBar } from 'react-native-paper';

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

PaperNavigationBar.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
  back: PropTypes.shape(),
};

export default StackScreen;
