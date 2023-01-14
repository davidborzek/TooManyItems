import Chip from '../../components/Chip/Chip';
import React from 'react';
import renderer from 'react-test-renderer';

it('Chip renders correctly with required props', () => {
  const tree = renderer.create(<Chip title="Some Title" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Chip renders correctly in selected state', () => {
  const tree = renderer.create(<Chip title="Some Title" selected />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Chip renders correctly with icon', () => {
  // Note: The icon causes a console.error only in test
  const tree = renderer.create(<Chip title="Some Title" icon="add" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Chip renders correctly with onPress', () => {
  const tree = renderer
    .create(
      <Chip title="Some Title" onPress={() => console.log('do something')} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
