import { makeShallowRenderer, getMockedLocaleProps } from 'shared/helpers';
import { makeMockEvent } from 'shared/mocks';
import { ClickAwayListener } from 'shared/view/components';

import { LayoutHeaderMenu, IHeaderMenuProps } from '../LayoutHeaderMenu';

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
  ...getMockedLocaleProps(),
};

const clickEvent = makeMockEvent('click');
const getComponent = makeShallowRenderer(LayoutHeaderMenu, props);

describe('(modules/shared) LayoutHeaderMenu component', () => {
  it('should render every menu item', () => {
    const component = getComponent();
    expect(component.find('.layout-header-menu__menu-item').length).toBe(props.menuItems.length);
  });

  it('should toggle menu on menu icon click and touchend', () => {
    const component = getComponent();
    const menuIcon = component.find('.layout-header-menu__menu-icon');

    expect(component.state().isMenuOpen).toBe(false);
    menuIcon.simulate('click', clickEvent);
    expect(component.state().isMenuOpen).toBe(true);
    menuIcon.simulate('click', clickEvent);
    expect(component.state().isMenuOpen).toBe(false);

    menuIcon.simulate('touchend', clickEvent);
    expect(component.state().isMenuOpen).toBe(true);
    menuIcon.simulate('touchend', clickEvent);
    expect(component.state().isMenuOpen).toBe(false);
  });

  it('should close menu on clickaway', () => {
    const component = getComponent();
    component.find('.layout-header-menu__menu-icon').simulate('click', clickEvent);
    expect(component.state().isMenuOpen).toBe(true);
    component.find(ClickAwayListener).prop('onClickAway')();
    expect(component.state().isMenuOpen).toBe(false);
  });

  it('should not open menu on clickaway', () => {
    const component = getComponent();
    expect(component.state().isMenuOpen).toBe(false);
    component.find(ClickAwayListener).prop('onClickAway')();
    expect(component.state().isMenuOpen).toBe(false);
  });
});
