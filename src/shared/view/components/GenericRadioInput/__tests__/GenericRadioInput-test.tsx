import * as React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Radio } from 'react-bootstrap';
import GenericRadioInput, { IState } from './../GenericRadioInput';
import { IProps } from '../../GenericInput/GenericInput';
import InputGroup from './../../../elements/InputGroup/InputGroup';

describe('(Shared) View', () => {
  describe('(Component) GenericRadioInput', () => {

    it('should render GenericRadioInput', () => {
      const component = mount<IProps, IState>(<GenericRadioInput  />);
      expect(component.find(InputGroup)).to.have.length(1);
    });

    it('should set empty value when just mounted', () => {
      const component = mount<IProps, IState>(<GenericRadioInput required />);
      expect(component.state().errors).to.deep.equal(['Field is required']);
    });

    it('should render radio element if has options', () => {
      const component = mount<IProps, IState>(<GenericRadioInput required enum={['option1', 'option2']} />);
      expect(component.find(Radio)).to.not.length(0);
    });

  });
});
