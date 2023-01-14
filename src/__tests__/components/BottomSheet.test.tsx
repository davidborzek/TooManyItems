import BottomSheet, {
  BottomSheetItem,
} from '../../components/BottomSheet/BottomSheet';

import React from 'react';
import renderer from 'react-test-renderer';

const items: BottomSheetItem[] = [
  {
    onPress: () => console.log('do something'),
    text: 'Some text',
  },
  {
    onPress: () => console.log('do something'),
    disabled: true,
    text: 'Some disabled text',
  },
  {
    color: 'red',
    onPress: () => console.log('do something'),
    text: 'Some red text',
  },
  {
    color: 'red',
    disabled: true,
    onPress: () => console.log('do something'),
    text: 'Some red disabled text',
  },
];

it('BottomSheet renders correctly and is closed', () => {
  const tree = renderer.create(<BottomSheet items={items} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('BottomSheet renders correctly and is opened', () => {
  const tree = renderer.create(<BottomSheet items={items} visible />).toJSON();
  expect(tree).toMatchSnapshot();
});
