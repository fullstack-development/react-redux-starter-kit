type Transmitter = (deps: any, args?: any) => any[];

/**
 * Accepts a function that takes props and arguments of method, which should be memoized
 * and returns an array of them. Also bind memoized function.
 */
export const memoizeByProps = (transmitter: Transmitter) =>
  (_target: any, _key: any, { value: oldValue, get: getter }: PropertyDescriptor) => {
    let cache: any;
    let cachedDeps: any[] = [];

    return {
      configurable: true,
      get() {
        const fn: undefined | false | ((...args: any[]) => any) = (
          typeof oldValue === 'function' && oldValue.bind(this) ||
          typeof getter === 'function' && getter.call(this)
        );
        if (!fn) {
          throw new Error('Memoization can only be made with function');
        }
        return (...args: any[]) => {
          const deps = transmitter(this.props, ...args);
          if (cachedDeps.every((x, i) => x === deps[i])) {
            cache = fn(...args);
            cachedDeps = deps;
          }
          return cache;
        };
      },
    };
  };
