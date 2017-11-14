import * as React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import GenericTimeInput, { IState } from './../GenericTimeInput';
import { IProps } from '../../GenericInput/GenericInput';
import InputGroup from './../../../elements/InputGroup/InputGroup';

describe('(Shared) View', () => {
  describe('(Component) GenericTimeInput', () => {

    it('should render GenericTimeInput', () => {
      const component = mount<IProps, IState>(<GenericTimeInput  />);
      expect(component.find(InputGroup)).to.have.length(1);
    });

    it('should set empty value when just mounted', () => {
      const component = mount<IProps, IState>(<GenericTimeInput required />);
      expect(component.state().errors).to.deep.equal(['Field is required']);
    });

  });
});
