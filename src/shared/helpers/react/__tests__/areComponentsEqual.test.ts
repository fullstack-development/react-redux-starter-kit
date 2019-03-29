import { makeMockComponent } from 'shared/mocks';
import { areComponentsEqual } from '..';

describe('areComponentsEqual', () => {
  const FirstComponent = makeMockComponent('FirstComponent');
  const SecondComponent = makeMockComponent('SecondComponent');

  it('should return true if components are equal', () => {
    expect(areComponentsEqual(FirstComponent, FirstComponent)).toBe(true);
  });

  it('should false if components are not equal', () => {
    expect(areComponentsEqual(FirstComponent, SecondComponent)).toBe(false);
  });
});
