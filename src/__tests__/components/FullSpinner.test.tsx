import FullSpinner from '../../components/FullSpinner/FullSpinner';
import React from 'react';
import renderer from 'react-test-renderer';

it('FullSpinner renders correctly', () => {
  const tree = renderer.create(<FullSpinner />).toJSON();
  expect(tree).toMatchSnapshot();
});
