// import * as React from 'react';
// import { expect } from 'chai';
// import { mount } from 'enzyme';
// import { spy } from 'sinon';
// import GenericLocationInput, { IState } from './../GenericLocationInput';
// import { IProps } from '../../GenericInput/GenericInput';
// import InputGroup from './../../../elements/InputGroup/InputGroup';

// describe('(Shared) View', () => {
//   describe('(Component) GenericLocationInput', () => {

//     it('should render GenericIntegerInput', () => {
//       const component = mount<IProps, IState>(<GenericLocationInput  />);
//       expect(component.find(InputGroup)).to.have.length(1);
//     });

//     // it('should set empty value when just mounted', () => {
//     //   const onChangeSpy = spy();
//     //   mount<IProps, IState>(<GenericIntegerInput onChange={onChangeSpy} minimum={1} maximum={10} />);

//     //   expect(onChangeSpy.called).to.be.equal(true);
//     //   expect(onChangeSpy.firstCall.args).to.deep.equal(['', ['Number value is incorrect']]);
//     // });

//     // it('should set required error if value is empty', () => {
//     //   const onChangeSpy = spy();
//     //   const component =
//     //     mount<IProps, IState>(<GenericIntegerInput onChange={onChangeSpy} required minimum={1} maximum={10} />);

//     //   expect(component.state().errors).to.deep.equal(['Field is required']);
//     // });

//     // it('should set error when value less minimal vaue', () => {
//     //   const onChangeSpy = spy();
//     //   const event = { nativeEvent: { target: { value: '1' } } } as any;
//     //   const component =
//     //     mount<IProps, IState>(<GenericIntegerInput onChange={onChangeSpy} required minimum={2} maximum={10} />);
//     //   const textInput = component.find('TextInput').first();
//     //   const textInputProps = textInput.props();
//     //   if (textInputProps.onChange) {
//     //     textInputProps.onChange(event);
//     //   }
//     //   expect(component.state().errors).to.deep.equal(['Number value is too low']);
//     // });

//     // it('should set error when value more maximal vaue', () => {
//     //   const onChangeSpy = spy();
//     //   const event = { nativeEvent: { target: { value: '11' } } } as any;
//     //   const component =
//     //     mount<IProps, IState>(<GenericIntegerInput onChange={onChangeSpy} required minimum={2} maximum={10} />);
//     //   const textInput = component.find('TextInput').first();
//     //   const textInputProps = textInput.props();
//     //   if (textInputProps.onChange) {
//     //     textInputProps.onChange(event);
//     //   }
//     //   expect(component.state().errors).to.deep.equal(['Number value is too big']);
//     // });

//     // it('should set error when value is incorrect', () => {
//     //   const onChangeSpy = spy();
//     //   const event = { nativeEvent: { target: { value: 'empty' } } } as any;
//     //   const component =
//     //     mount<IProps, IState>(<GenericIntegerInput onChange={onChangeSpy} required minimum={2} maximum={10} />);
//     //   const textInput = component.find('TextInput').first();
//     //   const textInputProps = textInput.props();
//     //   if (textInputProps.onChange) {
//     //     textInputProps.onChange(event);
//     //   }
//     //   expect(component.state().errors).to.deep.equal(['Number value is incorrect']);
//     // });

//   });
// });
