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
  IdeaScreen,
  AddCommentScreen,
  EditIdeaScreen,
  EditProfileScreen,
  EditCommentScreen,
  AddRoleScreen,
} from '../screens/';
import AddTagScreen from '../screens/AddTagScreen';
import SubscribeTagScreen from '../screens/SubscribeTagScreen';

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
            name="New Idea"
            component={UploadScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Add Comment"
            component={AddCommentScreen}
          />
          <Stack.Screen name="Idea" component={IdeaScreen} />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Edit"
            component={EditIdeaScreen}
          />
          <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Edit Comment"
            component={EditCommentScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Add Role"
            component={AddRoleScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Add Tag"
            component={AddTagScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Subscribe Tag"
            component={SubscribeTagScreen}
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
