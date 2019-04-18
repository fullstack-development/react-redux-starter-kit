import * as R from 'ramda';

type Transmitter = (deps: any, args?: any) => any[];

/**
 * Accepts a function that takes props and arguments of method, which should be memoized
 * and returns an array of them. Also bind memoized function.
 */
export const memoizeByProps = (transmitter: Transmitter) =>
  (_target: any, key: any, { value: oldValue, get: getter }: PropertyDescriptor) => {
    let cache: any;
    let cachedDeps: any[] = [];

    return {
      configurable: true,
      get() {
        const fn: undefined | false | ((...args: any[]) => any) = (
          oldValue && typeof oldValue === 'function' && oldValue.bind(this) ||
          getter && typeof getter === 'function' && getter.call(this)
        );
        if (!fn) {
          throw new Error('Memoization can only be made with function');
        }
        const value = (...args: any[]) => {
          const deps = transmitter(this.props, ...args);
          if (!R.equals(deps, cachedDeps)) {
            cache = fn(...args);
            cachedDeps = deps;
          }
          return cache;
        };
        Object.defineProperty(this, key, {
          value,
          configurable: true,
          writable: true,
        });
        return value;
      },
    };
  };
