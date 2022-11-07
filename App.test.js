import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('<App />', () => {
  it('has 1 child', async () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.children.length).toBe(1);
    await new Promise((resolve) => setTimeout(() => resolve(true), 10));
  });
});
