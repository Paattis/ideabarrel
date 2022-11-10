import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/MainScreen';
import SecondScreen from '../screens/SecondScreen';
import PaperNavigationBar from './NavigationBar';

const Stack = createNativeStackNavigator();

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

export default StackScreen;
