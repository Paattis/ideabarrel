import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import WelcomeScreen from '../WelcomeScreen';

describe('<WelcomeScreen />', () => {
  it('should navigate to sign in screen on navigate press', () => {
    const navigation = { navigate: () => {} };
    jest.spyOn(navigation, 'navigate');
    const { getByTestId } = render(<WelcomeScreen navigation={navigation} />);

    fireEvent.press(getByTestId('sign_in'));

    expect(navigation.navigate).toHaveBeenCalledWith('Sign In');
  });

  it('should navigate to sign un screen on navigate press', () => {
    const navigation = { navigate: () => {} };
    jest.spyOn(navigation, 'navigate');
    const { getByTestId } = render(<WelcomeScreen navigation={navigation} />);

    fireEvent.press(getByTestId('sign_up'));

    expect(navigation.navigate).toHaveBeenCalledWith('Sign Up');
  });
});
