declare module '_helpers' {
  /**
   * Remove properties `K` from `T`.
   *
   * @internal
   */
  export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

  /**
   * `T extends ConsistentWith<T, U>` means that where `T` has overlapping properties with
   * `U`, their value types do not conflict.
   *
   * @internal
   */
  export type ConsistentWith<T, U> = Pick<U, keyof T & keyof U>;

  type _Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
  /**
   * Like `T & U`, but using the value types from `U` where their properties overlap.
   *
   * @internal
   */
  export type Overwrite<T, U> = (U extends ConsistentWith<U, T> ? T : _Omit<T, keyof U>) & U;
}
