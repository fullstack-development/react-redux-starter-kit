import * as React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import GenericDropdownInput, { IState } from './../GenericDropdownInput';
import { IProps as GenericFieldProps } from '../../GenericInput/GenericInput';
import InputGroup from './../../../elements/InputGroup/InputGroup';

describe('(Shared) View', () => {
  describe('(Component) GenericDropdownInput', () => {

    it('should render GenericDropdownInput', () => {
      const component = mount(<GenericDropdownInput />);
      expect(component.find(InputGroup)).to.have.length(1);
    });

    it('should set in state property isEdited when selec input changed', () => {
      const onChangeSpy = spy();
      const component = mount<GenericFieldProps, IState>(<GenericDropdownInput required onChange={onChangeSpy} />);
      const selectInput = component.find('SelectInput').first();
      const selectInputProps = selectInput.props();
      const event = { nativeEvent: { target: { value: null } } } as any;
      if (selectInputProps.onChange) {
        selectInputProps.onChange(event);
      }

      expect(onChangeSpy.called).to.be.equal(true);
      expect(component.state().isEdited).to.be.equal(true);
    });

    it('should call onChange, when just mounted with \'Field required\' error, if component is required', () => {
      const onChangeSpy = spy();
      mount<GenericFieldProps, IState>(<GenericDropdownInput onChange={onChangeSpy} required />);
      expect(onChangeSpy.calledOnce).to.be.equal(true);
      expect(onChangeSpy.firstCall.args).to.deep.equal(['', ['Field is required']]);
    });

    it('should call onChange, when just mounted with \'Field required\' error, if component is required', () => {
      const onChangeSpy = spy();
      mount<GenericFieldProps, IState>(<GenericDropdownInput onChange={onChangeSpy} required />);
      expect(onChangeSpy.calledOnce).to.be.equal(true);
      expect(onChangeSpy.firstCall.args).to.deep.equal(['', ['Field is required']]);
    });

  });
});
