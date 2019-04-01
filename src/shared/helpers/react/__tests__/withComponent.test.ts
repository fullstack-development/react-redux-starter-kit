import * as R from 'ramda';
import { makeMockComponent } from 'shared/mocks';
import { makeShallowRenderer } from 'shared/helpers';
import { withComponent } from '..';

// Outer passes Passed to Inner
const PassedComponent = makeMockComponent('PassedComponent');
const InnerComponent = makeMockComponent('InnerComponent');
const OuterComponent = withComponent(PassedComponent)(InnerComponent);
const outerComponentProps = { prop: 'prop', anotherProp: 'prop' };
const getOuterComponent = makeShallowRenderer(OuterComponent, outerComponentProps);

describe('(shared/helpers/react) withComponent', () => {
  it('should pass component to inner component as a prop', () => {
    const outerComponent = getOuterComponent();
    expect(outerComponent.find(InnerComponent).prop('component')).toBe(PassedComponent);
  });

  it('should pass all outer component props + component to inner component', () => {
    const outerComponent = getOuterComponent();
    const outerPropsNames = Object.keys(outerComponentProps);
    const innerPropsNames = Object.keys(outerComponent.find(InnerComponent).props());
    const passedProps = R.intersection(
      outerPropsNames.concat('component'),
      innerPropsNames,
    );
    expect(passedProps.length).toBe(innerPropsNames.length);
  });
});
