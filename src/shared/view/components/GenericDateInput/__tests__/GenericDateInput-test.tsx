import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { spy } from 'sinon';
import GenericDateInput, { IProps, IState } from './../GenericDateInput';
import { IProps as ITextInputProps } from 'shared/view/elements/TextInput/TextInput';

describe('(Shared) View', () => {
  describe('(Component) GenericDateInput', () => {
    it('should match snapshot', () => {
      expect(shallow(<GenericDateInput />)).toMatchSnapshot();
    });

    it('should call onChange prop, if onChange called in TextInput composite component', () => {
      const onChangeSpy = spy();
      const component = shallow<IProps, IState>(<GenericDateInput onChange={onChangeSpy} />);
      const textInput = component.find('TextInput').first() as ShallowWrapper<ITextInputProps, {}>;
      const event = { nativeEvent: { target: { value: '123' } } } as any;
      textInput.simulate('change', event);

      expect(onChangeSpy.calledTwice).toBe(true);
      expect(onChangeSpy.firstCall.args).toEqual(['', []]);
      expect(onChangeSpy.secondCall.args).toEqual(['123', []]);
    });

    it('should call onChange, when just mounted with \'Field required\' error, if component is required', () => {
      const onChangeSpy = spy();
      shallow<IProps, IState>(<GenericDateInput onChange={onChangeSpy} required />);
      expect(onChangeSpy.calledOnce).toBe(true);
      expect(onChangeSpy.firstCall.args).toEqual(['', ['Field is required']]);
    });
  });
});
