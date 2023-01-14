import ImageList, { ImageListItem } from '../../components/ImageList/ImageList';

import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';

const items: ImageListItem[] = [
  {
    image: 'Some image',
    name: 'Some name',
  },
];

it('ImageList renders correctly with required props and no items', () => {
  const tree = renderer.create(<ImageList items={[]} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('ImageList renders correctly with required props and items', () => {
  const tree = renderer.create(<ImageList items={items} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('ImageList renders correctly refreshing', () => {
  const tree = renderer.create(<ImageList items={items} refreshing />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('ImageList renders correctly with all props', () => {
  const tree = renderer
    .create(
      <ImageList
        items={items}
        ListEmptyComponent={<Text>Empty State</Text>}
        onLongPress={() => ''}
        onPress={() => ''}
        onRefresh={() => ''}
        imagePlaceholderIcon="add"
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
