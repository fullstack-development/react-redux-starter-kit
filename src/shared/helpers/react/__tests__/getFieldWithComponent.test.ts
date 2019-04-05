import * as R from 'ramda';
import React from 'react';
import { Field } from 'react-final-form';
import { makeMockComponent } from 'shared/mocks';
import { makeShallowRenderer } from 'shared/helpers';
import { getFieldWithComponent } from '..';

const PassedComponent = makeMockComponent('PassedComponent');
const outerComponentProps = {
  prop: 'some prop',
  name: 'field name',
};
const fieldType = 'type';

const OuterComponent = getFieldWithComponent(PassedComponent, fieldType);
const getOuterComponent = makeShallowRenderer(OuterComponent, outerComponentProps);

describe('(shared/helpers/react) getFieldWithComponent', () => {
  it('should pass component to Field component', () => {
    const outerComponent = getOuterComponent();
    expect(outerComponent.find(Field).prop('component')).toBe(PassedComponent);
  });

  it('should pass field type to Field component', () => {
    const outerComponent = getOuterComponent();
    expect(outerComponent.find(Field).prop('type')).toBe(fieldType);
  });

  it('should pass all outer component props + component + type to Field component', () => {
    const outerComponent = getOuterComponent();
    const outerPropsNames = Object.keys(outerComponentProps);
    const fieldPropsNames = Object.keys(outerComponent.find(Field).props());
    const passedProps = R.intersection(
      outerPropsNames.concat('component', 'type'),
      fieldPropsNames,
    );
    expect(passedProps.length).toBe(fieldPropsNames.length);
  });

  it('should add correct displayName for outer component', () => {
    expect(OuterComponent.displayName).toBe(`FieldWithComponent(${PassedComponent.displayName})`);

    const ComponentWithoutDisplayName = () => React.createElement('div');
    expect(getFieldWithComponent(ComponentWithoutDisplayName, fieldType).displayName)
      .toBe(`FieldWithComponent(${ComponentWithoutDisplayName.name})`);

    expect(getFieldWithComponent(() => React.createElement('div'), fieldType).displayName)
      .toBe(`FieldWithComponent(Component)`);
  });
});
