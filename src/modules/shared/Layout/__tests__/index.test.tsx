import React from 'react';
import { shallow } from 'enzyme';

import { makeMockEntry, withRouterProps } from 'shared/mocks';

import { Layout, ILayoutProps } from '../Layout';

const props: ILayoutProps = {
  title: 'Title',
  profileFeatureEntry: makeMockEntry(),
  ...withRouterProps,
};

describe('Layout component', () => {
  it('should match snapshot', () => {
    const component = shallow(<Layout {...props} />);
    expect(component).toMatchSnapshot();
  });
});
