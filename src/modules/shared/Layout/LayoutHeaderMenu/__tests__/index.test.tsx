import React from 'react';
import { shallow } from 'enzyme';

import LayoutHeaderMenu, { IHeaderMenuProps } from '../LayoutHeaderMenu';

const props: IHeaderMenuProps = {
  menuItems: [
    {
      path: '/',
      title: 'Title',
    },
    {
      path: '/test',
      title: 'Title2',
    },
  ],
};

describe('LayoutHeaderMenu component', () => {
  it('should match snapshot', () => {
    const component = shallow(<LayoutHeaderMenu {...props} />);
    expect(component).toMatchSnapshot();
  });
});
