import * as React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Errors, { IProps } from './../Errors';

describe('(Shared) View', () => {
  describe('(Element) Errors', () => {

    it('should render Errors', () => {
      const component = mount<IProps, {}>(<Errors />);
      expect(component.find('.errors')).to.have.length(1);
    });

    it('should check rendered errors', () => {
      const component = mount<IProps, {}>(<Errors errors={['error1', 'error2']} />);
      const errors = component.find('.errors__error');
      expect(errors.length).to.be.equal(2);
    });

  });
});
