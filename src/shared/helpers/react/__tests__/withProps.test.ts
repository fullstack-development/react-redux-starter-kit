import * as R from 'ramda';
import React from 'react';
import { makeMockComponent } from 'shared/mocks';
import { makeShallowRenderer } from 'shared/helpers';
import { withProps } from '..';

const staticProps = {
  staticProp1: 1,
  staticProp2: 2,
};
const dynamicProps = {
  dynamicProp1: 1,
  dynamicProp2: 2,
};

const InnerComponent = makeMockComponent('InnerComponent');
const OuterComponent = withProps(InnerComponent, staticProps);
const getOuterComponent = makeShallowRenderer(OuterComponent, dynamicProps);

describe('(shared/helpers/react) withProps', () => {
  it('should pass static and dynamic props to inner component', () => {
    const outerComponent = getOuterComponent();
    expect(outerComponent.find(InnerComponent).props()).toEqual(R.merge(staticProps, dynamicProps));
  });

  it('should add correct displayName for outer component', () => {
    expect(OuterComponent.displayName).toBe(`WithProps(${InnerComponent.displayName})`);

    const ComponentWithoutDisplayName = () => React.createElement('div');
    expect(withProps(ComponentWithoutDisplayName, {}).displayName)
      .toBe(`WithProps(${ComponentWithoutDisplayName.name})`);

    expect(withProps(() => React.createElement('div'), {}).displayName)
      .toBe(`WithProps(Component)`);
  });
});
