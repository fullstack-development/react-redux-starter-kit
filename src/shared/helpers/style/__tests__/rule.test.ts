import { rule } from '../';

describe('(shared/helpers/style) rule', () => {
  it('should only add TypeScript type and not change input styles', () => {
    const JSSStyles = {
      top: 0,
      left: 0,
      width: 322,
    };
    const JSSStylesWithType = rule(JSSStyles);
    expect(JSSStyles).toEqual(JSSStylesWithType);
  });
});
