import * as R from 'ramda';

type Transmitter = (deps: any, args?: any) => any[];

/**
 * Accepts a function that takes props and arguments of method, which should be memoized
 * and returns an array of them. Also bind memoized function.
 */
export const memoizeByProps = (transmitter: Transmitter) =>
  (_target: any, key: any, { value: fn }: PropertyDescriptor) => {
    if (typeof fn !== 'function') {
      throw new Error('Memoization can only be made with function');
    }
    let cache: any;
    let cachedDeps: any[] = [];

    return {
      configurable: true,
      get() {
        const value = ((...args: any[]) => {
          const deps = transmitter(this.props, ...args);
          if (!R.equals(deps, cachedDeps)) {
            cache = fn.call(this, ...args);
            cachedDeps = deps;
          }
          return cache;
        }).bind(this);
        Object.defineProperty(this, key, {
          value,
          configurable: true,
          writable: true,
        });
        return value;
      },
    };
  };
