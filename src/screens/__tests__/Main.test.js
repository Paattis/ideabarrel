import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import MainScreen from '../MainScreen';

describe('<MainScreen />', () => {
  it('should navigate to second screen on navigate press', () => {
    const navigation = { navigate: () => {} };
    jest.spyOn(navigation, 'navigate');

    const screen = render(<MainScreen navigation={navigation} />);

    const navButton = screen.getByTestId('navButton');

    fireEvent.press(navButton);

    expect(navigation.navigate).toHaveBeenCalledWith('Second');
  });
});
