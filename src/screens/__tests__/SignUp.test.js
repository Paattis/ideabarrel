import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import SignUpScreen from '../SignUpScreen';
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('<SignUpScreen />', () => {
  describe('with invalid email address', () => {
    it('should display invalid email error message', async () => {
      const { getByTestId, queryAllByText } = render(<SignUpScreen />);

      fireEvent.changeText(getByTestId('email_input'), 'invalid email');

      fireEvent.changeText(getByTestId('full_name_input'), 'test name');
      fireEvent.changeText(getByTestId('username_input'), 'username');
      fireEvent.changeText(getByTestId('password_input'), 'QWEqwe123');
      fireEvent.changeText(getByTestId('confirm_password_input'), 'QWEqwe123');

      await act(async () => {
        fireEvent.press(getByTestId('register_button'));
      });

      expect(queryAllByText('Email has to be valid.').length).toBe(1);
    });
  });

  describe('with invalid full name', () => {
    it('should display invalid full name error message', async () => {
      const { getByTestId, queryAllByText } = render(<SignUpScreen />);

      fireEvent.changeText(getByTestId('full_name_input'), 'x');

      fireEvent.changeText(getByTestId('email_input'), 'some@test.com');
      fireEvent.changeText(getByTestId('username_input'), 'username');
      fireEvent.changeText(getByTestId('password_input'), 'QWEqwe123');
      fireEvent.changeText(getByTestId('confirm_password_input'), 'QWEqwe123');

      await act(async () => {
        fireEvent.press(getByTestId('register_button'));
      });

      expect(
        queryAllByText('Full name must be at least 3 characters long').length
      ).toBe(1);
    });
  });

  describe('with invalid username', () => {
    it('should display invalid username error message', async () => {
      const { getByTestId, queryAllByText } = render(<SignUpScreen />);

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

      expect(
        queryAllByText('Username must be 2 - 15 characters long with no spaces')
          .length
      ).toBe(1);
    });
  });

  describe('with invalid password', () => {
    it('should display invalid password error message', async () => {
      const { getByTestId, queryAllByText } = render(<SignUpScreen />);

      fireEvent.changeText(getByTestId('password_input'), 'password');

      fireEvent.changeText(getByTestId('email_input'), 'some@test.com');
      fireEvent.changeText(getByTestId('full_name_input'), 'test name');
      fireEvent.changeText(getByTestId('username_input'), 'username');
      fireEvent.changeText(getByTestId('confirm_password_input'), 'QWEqwe123');

      await act(async () => {
        fireEvent.press(getByTestId('register_button'));
      });

      expect(
        queryAllByText(
          'Password must be at least 8 characters long with one uppercase character and a number'
        ).length
      ).toBe(1);
    });
  });

  describe('with invalid confirm password', () => {
    it('should display mismatching passwords error message', async () => {
      const { getByTestId, queryAllByText } = render(<SignUpScreen />);

      fireEvent.changeText(getByTestId('confirm_password_input'), 'QWEqwe12');

      fireEvent.changeText(getByTestId('email_input'), 'some@test.com');
      fireEvent.changeText(getByTestId('full_name_input'), 'test name');
      fireEvent.changeText(getByTestId('username_input'), 'username');
      fireEvent.changeText(getByTestId('password_input'), 'QWEqwe123');

      await act(async () => {
        fireEvent.press(getByTestId('register_button'));
      });

      expect(queryAllByText('Password does not match').length).toBe(1);
    });
  });
});
