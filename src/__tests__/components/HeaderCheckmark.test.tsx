import HeaderCheckmark from '../../components/HeaderCheckmark/HeaderCheckmark';
import React from 'react';
import renderer from 'react-test-renderer';

it('HeaderCheckmark renders correctly', () => {
  const tree = renderer.create(<HeaderCheckmark />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('HeaderCheckmark renders correctly disabled', () => {
  const tree = renderer.create(<HeaderCheckmark disabled />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('HeaderCheckmark renders correctly with onPress', () => {
  const tree = renderer.create(<HeaderCheckmark onPress={() => ''} />).toJSON();
  expect(tree).toMatchSnapshot();
});
