import Selection, { SelectionItem } from '../../components/Selection/Selection';

import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';

const items: SelectionItem<string>[] = [
  {
    label: 'Some label',
    value: 'Some value',
  },
];

it('Selection renders correctly with required props, no items and closed', () => {
  const tree = renderer
    .create(
      <Selection items={[]} onChange={() => ''} setOpen={() => ''} value="" />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Selection renders correctly with required props, with items and closed', () => {
  const tree = renderer
    .create(
      <Selection
        items={items}
        onChange={() => ''}
        setOpen={() => ''}
        value=""
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Selection renders correctly with required props, with items and opened', () => {
  const tree = renderer
    .create(
      <Selection
        items={items}
        onChange={() => ''}
        setOpen={() => ''}
        value=""
        visible
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Selection renders correctly with full props and opened', () => {
  const tree = renderer
    .create(
      <Selection
        items={items}
        onChange={() => ''}
        setOpen={() => ''}
        value=""
        visible
        EmptyStateComponent={<Text>Empty</Text>}
        label="Some label"
        placeholder="Some placeholder"
        title="Some title"
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
