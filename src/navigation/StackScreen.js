import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PaperNavigationBar from './NavigationBar';
import { MainContext } from '../contexts/MainContext';
import {
  WelcomeScreen,
  MainScreen,
  SignUpScreen,
  UploadScreen,
  SignInScreen,
} from '../screens/';

const Stack = createNativeStackNavigator();

const StackScreen = () => {
  const { signedIn } = useContext(MainContext);
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        animation: 'fade_from_bottom',
        header: (props) => <PaperNavigationBar {...props} />,
      }}
    >
      {signedIn ? (
        <>
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen
            options={{ headerShown: false }}
            name="New Post"
            component={UploadScreen}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Sign Up" component={SignUpScreen} />
          <Stack.Screen name="Sign In" component={SignInScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackScreen;
