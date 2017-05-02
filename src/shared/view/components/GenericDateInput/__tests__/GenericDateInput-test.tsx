import * as React from 'react';
import { expect, AssertionError } from 'chai';
import { mount, shallow, ShallowWrapper } from 'enzyme';
import { spy } from 'sinon';
import GenericDateInput, { IProps, IState } from './../GenericDateInput';
import { IProps as ITextInputProps } from 'shared/view/elements/TextInput/TextInput';

describe('(Shared) View', () => {
  describe('(Component) GenericDateInput', () => {
    it('should render <input> tag', () => {
      const component = mount(<GenericDateInput />);
      const header = component.find('input');

      expect(header.length).to.be.equal(1);
    });

    it('should call onChange prop, if onChange called in TextInput composite component', () => {
      const onChangeSpy = spy();
      const component = shallow<IProps, IState>(<GenericDateInput onChange={onChangeSpy} />);
      const textInput = component.find('TextInput').first() as ShallowWrapper<ITextInputProps, {}>;
      const textInputProps: ITextInputProps = textInput.props();
      const event = { nativeEvent: { target: { value: '123' } } } as any;

      if (textInputProps.onChange) {
        textInputProps.onChange(event);
      } else {
        throw new AssertionError('OnChange doesn\'t passed to TextInput');
      }

      expect(onChangeSpy.calledOnce).to.be.true;
      expect(onChangeSpy.firstCall.args).to.deep.equal(['123', []]);
    });

    it('should call onChange, when just mounted with \'Field required\' error, if component is required', () => {
      const onChangeSpy = spy();
      mount<IProps, IState>(<GenericDateInput onChange={onChangeSpy} required />);
      expect(onChangeSpy.calledOnce).to.be.true;
      expect(onChangeSpy.firstCall.args).to.deep.equal(['', ['Field is required']]);
    });
  });
});
