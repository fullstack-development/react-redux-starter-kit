import { styledBy, rule } from '../';

describe('(shared) Style heplers', () => {
  describe('styledBy', () => {
    interface IProps {
      color: 'black' | 'blue';
    }

    it('should return function that gets value from mapping using prop value from props', () => {
      const black = 'rgb(0, 0, 0)';
      const blue = 'rgb(0, 0, 100)';
      const getStyle = styledBy<IProps, 'color', string>('color', { black, blue });
      expect(getStyle({ color: 'black' })).toBe(black);
      expect(getStyle({ color: 'blue' })).toBe(blue);
    });
  });

  describe('rule', () => {
    it('should not change props', () => {
      const props = {};
      expect(rule(props)).toBe(props);
    });
  });
});
