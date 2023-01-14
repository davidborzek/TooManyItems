import EmptyState from '../../components/EmptyState/EmptyState';
import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';

it('EmptyState renders correctly with required props', () => {
  const tree = renderer.create(<EmptyState message="Some message" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('EmptyState renders correctly with props', () => {
  const tree = renderer
    .create(
      <EmptyState
        message="Some message"
        description="Some description"
        icon="add"
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('EmptyState renders correctly with children', () => {
  const tree = renderer
    .create(
      <EmptyState message="Some message">
        <Text>Custom children</Text>
      </EmptyState>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
