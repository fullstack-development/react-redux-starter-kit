import React from 'react';
import { shallow } from 'enzyme';

import { event } from 'shared/mocks';

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

describe('(modules/shared) LayoutHeaderMenu component', () => {
  const component = shallow(<LayoutHeaderMenu {...props} />);

  it('should render every menu item', () => {
    expect(component.find('.layout-header-menu__menu-item').length).toBe(props.menuItems.length);
  });

  it('should toggle menu on menu icon click and touchend', () => {
    const menuIcon = component.find('.layout-header-menu__menu-icon');

    expect(component.state().isMenuOpen).toBe(false);
    menuIcon.simulate('click', event);
    expect(component.state().isMenuOpen).toBe(true);
    menuIcon.simulate('click', event);
    expect(component.state().isMenuOpen).toBe(false);

    menuIcon.simulate('touchend', event);
    expect(component.state().isMenuOpen).toBe(true);
    menuIcon.simulate('touchend', event);
    expect(component.state().isMenuOpen).toBe(false);
  });

  it('should close menu on clickaway', () => {
    component.find('.layout-header-menu__menu-icon').simulate('click', event);
    expect(component.state().isMenuOpen).toBe(true);
    component.find('ClickAwayListener').prop<() => void>('onClickAway')();
    expect(component.state().isMenuOpen).toBe(false);
  });

  it('should not open menu on clickaway', () => {
    expect(component.state().isMenuOpen).toBe(false);
    component.find('ClickAwayListener').prop<() => void>('onClickAway')();
    expect(component.state().isMenuOpen).toBe(false);
  });
});
