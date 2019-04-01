import { makeMockComponent } from 'shared/mocks';
import { areComponentsEqual } from '..';

describe('areComponentsEqual', () => {
  it('should return true if components share the same name', () => {
    const componentName = 'FirstComponent';
    const FirstComponent = makeMockComponent(componentName);
    const FirstComponentCopy = makeMockComponent(componentName);
    expect(areComponentsEqual(FirstComponent, FirstComponent)).toBe(true);
    expect(areComponentsEqual(FirstComponent, FirstComponentCopy)).toBe(true);
  });

  it('should return false if components do not share the same name', () => {
    const FirstComponent = makeMockComponent('FirstComponent');
    const SecondComponent = makeMockComponent('SecondComponent');
    expect(areComponentsEqual(FirstComponent, SecondComponent)).toBe(false);
  });
});
