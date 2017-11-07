import * as React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import InputGroup, { IProps } from './../InputGroup';

describe('(Shared) View', () => {
  describe('(Element) InputGroup', () => {

    it('should render InputGroup', () => {
      const component = mount<IProps, {}>(<InputGroup />);
      expect(component.find('.input-group')).to.have.length(1);
    });

    it('should check rendered children', () => {
      const children = <span className="children">This children</span>;
      const component = mount<IProps, {}>(<InputGroup>{children}</InputGroup>);
      const findedChildren = component.find('.children').instance();
      expect(component.contains(findedChildren as any)).to.be.equal(true);
    });

  });
});
