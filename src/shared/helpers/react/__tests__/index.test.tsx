import React from 'react';
import { shallow } from 'enzyme';
import * as R from 'ramda';
import { withComponent, withProps, getFieldWithComponent, areComponentsEqual } from '..';

describe('(shared) React helpers', () => {
  describe('withComponent', () => {
    interface IComponentProps extends React.HTMLAttributes<HTMLDivElement> {}

    const BaseComponent = () => <div />; // TODO: replace with mocks
    const Component = (props: IComponentProps) => <div {...props} />;
    const componentProps: IComponentProps = {
      contentEditable: false,
      tabIndex: 1,
      id: '1',
    };
    const WrappedComponent = withComponent(Component)(BaseComponent);
    const component = shallow(<WrappedComponent {...componentProps} />);

    it('should pass component to base component as a prop', () => {
      expect(component.find('BaseComponent').prop('component')).toBe(Component);
    });

    it('should pass props to base component', () => {
      const baseComponentPropsNames = Object.keys(component.find('BaseComponent').props());
      const componentPropsNames = Object.keys(componentProps);
      expect(R.intersection(baseComponentPropsNames, componentPropsNames)).toEqual(componentPropsNames);
    });
  });

  describe('withProps', () => {
    it('should pass props to component', () => {
      interface IBaseProps extends React.HTMLAttributes<HTMLDivElement> {}
      interface IAddedProps {
        newProp: string;
        anotherNewProp: number;
      }
      const baseProps: IBaseProps = { // TODO: replace with mocks
        contentEditable: false,
        tabIndex: 1,
        id: '1',
      };
      const addedProps: IAddedProps = {
        newProp: 'prop',
        anotherNewProp: 777,
      };

      const Component = (props: IBaseProps) => <div {...props} />;
      const WrappedComponent = withProps(Component, addedProps);
      const component = shallow(<WrappedComponent {...baseProps} />);
      expect(component.props()).toEqual(R.merge(baseProps, addedProps));
    });
  });

  describe('getFieldWithComponent', () => {
    interface IComponentProps extends React.HTMLAttributes<HTMLDivElement> {}

    const Component = (props: IComponentProps) => <div {...props} />;
    const componentProps: IComponentProps = { // TODO: replace with mocks
      contentEditable: false,
      tabIndex: 1,
      id: '1',
    };
    const fieldType = 'type';
    const fieldName = 'name';

    const WrappedComponent = getFieldWithComponent(Component, fieldType);
    const component = shallow(<WrappedComponent name={fieldName} {...componentProps} />);

    it('should pass component to field component as a prop', () => {
      expect(component.prop('component')).toBe(Component);
    });

    it('should pass field type to field component as a prop', () => {
      expect(component.prop('type')).toBe(fieldType);
    });

    it('should pass props to field component', () => {
      const fieldPropsNames = Object.keys(component.props());
      const componentPropsNames = Object.keys(componentProps);
      expect(R.intersection(fieldPropsNames, componentPropsNames)).toEqual(componentPropsNames);
    });
  });

  describe('areComponentsEqual', () => {
    const FirstComponent: React.ComponentType = () => <div/>; // TODO: replace with mocks
    const SecondComponent: React.ComponentType = () => <div/>;

    it('should return true if components are equal', () => {
      expect(areComponentsEqual(FirstComponent, FirstComponent)).toBe(true);
    });

    it('should false if components are not equal', () => {
      expect(areComponentsEqual(FirstComponent, SecondComponent)).toBe(false);
    });
  });
});
