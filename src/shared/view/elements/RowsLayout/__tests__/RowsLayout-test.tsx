import * as React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import RowsLayout, { IProps } from './../index';

describe('(Shared) View', () => {
  describe('(Element) RowsLayout', () => {

    it('should render InputGroup', () => {
      const component = mount<IProps, {}>(<RowsLayout />);
      expect(component.find('.rows-layout')).to.have.length(2);
    });

    it('should check rendered headerContent and children', () => {
      const headerContent = (<span className="header">Header</span>);
      const children = (<span className="children">Chidlren</span>);
      const component = mount<IProps, {}>(<RowsLayout headerContent={headerContent}>{children}</RowsLayout>);
      const findedHeaderContent = component.find('.header').instance() as any;
      const findedChildrenContent = component.find('.children').instance() as any;
      expect(component.contains(findedHeaderContent)).to.equal(true);
      expect(component.contains(findedChildrenContent)).to.equal(true);
    });

  });
});
