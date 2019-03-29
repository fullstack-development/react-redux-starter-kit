import { rule } from '../';

describe('(shared/helpers/style) rule', () => {
  it('should not change props', () => {
    const props = {};
    expect(rule(props)).toBe(props);
  });
});
