type Transmitter = (props: any, ...args: any) => any[];

/**
 * Accepts a function that takes props and arguments of method, which should be memoized
 * and returns an array of them. Also bind memoized function.
 */
export const memoizeByProps = (transmitter: Transmitter) =>
  (_target: any, key: any, { value: oldValue, get: getter }: PropertyDescriptor) => {
    return {
      configurable: true,
      get() {
        let cache: any;
        let cachedDeps: any[] = [];
        const fn: unknown = (
          typeof oldValue === 'function' && oldValue.bind(this) ||
          typeof getter === 'function' && getter.call(this)
        );
        if (typeof fn !== 'function') {
          throw new Error('Memoization can only be made with function');
        }
        const value = (...args: any[]) => {
          const deps = transmitter(this.props, ...args);
          if (cachedDeps.length === 0 || !cachedDeps.every((x, i) => x === deps[i])) {
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
