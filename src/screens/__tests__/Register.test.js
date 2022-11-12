import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import RegisterScreen from '../RegisterScreen';
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('<RegisterScreen />', () => {
  describe('with valid inputs', () => {
    it('should navigate to sign in screen with valid inputs', async () => {
      const navigation = { navigate: () => {} };
      jest.spyOn(navigation, 'navigate');
      const { getByTestId } = render(
        <RegisterScreen navigation={navigation} />
      );

      fireEvent.changeText(getByTestId('email_input'), 'some@test.com');
      fireEvent.changeText(getByTestId('full_name_input'), 'test name');
      fireEvent.changeText(getByTestId('username_input'), 'username');
      fireEvent.changeText(getByTestId('password_input'), 'QWEqwe123');
      fireEvent.changeText(getByTestId('confirm_password_input'), 'QWEqwe123');

      await act(async () => {
        fireEvent.press(getByTestId('register_button'));
      });

      expect(navigation.navigate).toHaveBeenCalledWith('SignIn');
    });
  });

  describe('with invalid email address', () => {
    it('should not navigate to sign in screen with invalid email', async () => {
      const navigation = { navigate: () => {} };
      jest.spyOn(navigation, 'navigate');
      const { getByTestId } = render(
        <RegisterScreen navigation={navigation} />
      );

      fireEvent.changeText(getByTestId('email_input'), 'invalid email');

      fireEvent.changeText(getByTestId('full_name_input'), 'test name');
      fireEvent.changeText(getByTestId('username_input'), 'username');
      fireEvent.changeText(getByTestId('password_input'), 'QWEqwe123');
      fireEvent.changeText(getByTestId('confirm_password_input'), 'QWEqwe123');

      await act(async () => {
        fireEvent.press(getByTestId('register_button'));
      });

      expect(navigation.navigate).not.toHaveBeenCalledWith('SignIn');
    });
  });

  describe('with invalid full name', () => {
    it('should not navigate to sign in screen with invalid full name', async () => {
      const navigation = { navigate: () => {} };
      jest.spyOn(navigation, 'navigate');
      const { getByTestId } = render(
        <RegisterScreen navigation={navigation} />
      );

      fireEvent.changeText(getByTestId('full_name_input'), 'x');

      fireEvent.changeText(getByTestId('email_input'), 'some@test.com');
      fireEvent.changeText(getByTestId('username_input'), 'username');
      fireEvent.changeText(getByTestId('password_input'), 'QWEqwe123');
      fireEvent.changeText(getByTestId('confirm_password_input'), 'QWEqwe123');

      await act(async () => {
        fireEvent.press(getByTestId('register_button'));
      });

      expect(navigation.navigate).not.toHaveBeenCalledWith('SignIn');
    });
  });

  describe('with invalid username', () => {
    it('should not navigate to sign in screen with invalid username', async () => {
      const navigation = { navigate: () => {} };
      jest.spyOn(navigation, 'navigate');
      const { getByTestId } = render(
        <RegisterScreen navigation={navigation} />
      );

      fireEvent.changeText(
        getByTestId('username_input'),
        'user name with spaces'
      );

      fireEvent.changeText(getByTestId('email_input'), 'some@test.com');
      fireEvent.changeText(getByTestId('full_name_input'), 'test name');
      fireEvent.changeText(getByTestId('password_input'), 'QWEqwe123');
      fireEvent.changeText(getByTestId('confirm_password_input'), 'QWEqwe123');

      await act(async () => {
        fireEvent.press(getByTestId('register_button'));
      });

      expect(navigation.navigate).not.toHaveBeenCalledWith('SignIn');
    });
  });

  describe('with invalid password', () => {
    it('should not navigate to sign in screen with invalid password', async () => {
      const navigation = { navigate: () => {} };
      jest.spyOn(navigation, 'navigate');
      const { getByTestId } = render(
        <RegisterScreen navigation={navigation} />
      );

      fireEvent.changeText(getByTestId('password_input'), 'password');

      fireEvent.changeText(getByTestId('email_input'), 'some@test.com');
      fireEvent.changeText(getByTestId('full_name_input'), 'test name');
      fireEvent.changeText(getByTestId('username_input'), 'username');
      fireEvent.changeText(getByTestId('confirm_password_input'), 'QWEqwe123');

      await act(async () => {
        fireEvent.press(getByTestId('register_button'));
      });

      expect(navigation.navigate).not.toHaveBeenCalledWith('SignIn');
    });
  });

  describe('with invalid confirm password', () => {
    it('should not navigate to sign in screen with mismatching passwords', async () => {
      const navigation = { navigate: () => {} };
      jest.spyOn(navigation, 'navigate');
      const { getByTestId } = render(
        <RegisterScreen navigation={navigation} />
      );

      fireEvent.changeText(getByTestId('confirm_password_input'), 'QWEqwe12');

      fireEvent.changeText(getByTestId('email_input'), 'some@test.com');
      fireEvent.changeText(getByTestId('full_name_input'), 'test name');
      fireEvent.changeText(getByTestId('username_input'), 'username');
      fireEvent.changeText(getByTestId('password_input'), 'QWEqwe123');

      await act(async () => {
        fireEvent.press(getByTestId('register_button'));
      });

      expect(navigation.navigate).not.toHaveBeenCalledWith('SignIn');
    });
  });
});
