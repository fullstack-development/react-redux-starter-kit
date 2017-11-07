import * as React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import { Navbar } from 'react-bootstrap';
import Header, { IProps } from './../index';

describe('(Shared) View', () => {
  describe('(Component) Header', () => {

    it('should render Header', () => {
      const component = mount<IProps, {}>(<Header />);
      expect(component.find(Navbar)).to.have.length(1);
    });

    it('should call onLinkClick with order param', () => {
      const onLinkClickSpy = spy();
      const component = mount<IProps, {}>(<Header onLinkClick={onLinkClickSpy}/>);
      const navItem = component.find('NavItem');
      const navItemProps = navItem.props() as any;
      if (navItemProps.onSelect) {
        navItemProps.onSelect('order');
      }
      expect(onLinkClickSpy.calledWith('/order')).to.be.equal(true);
    });

    it('should call onBrandClick with home param', () => {
      const onBrandClickSpy = spy();
      const component = mount<IProps, {}>(<Header onLinkClick={onBrandClickSpy}/>);
      const brand = component.find('.header__brand').first();
      brand.simulate('click');
      expect(onBrandClickSpy.calledWith('/home')).to.be.equal(true);
    });

  });
});
