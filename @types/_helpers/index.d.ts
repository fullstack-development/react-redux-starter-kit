declare module '_helpers' {
  /**
 * Remove properties `K` from `T`.
 *
 * @internal
 */
  export type Omit<T, K extends string> = Pick<T, Exclude<keyof T, K>>;

  /**
   * `T extends ConsistentWith<T, U>` means that where `T` has overlapping properties with
   * `U`, their value types do not conflict.
   *
   * @internal
   */
  export type ConsistentWith<T, U> = Pick<U, keyof T & keyof U>;

  /**
   * Like `T & U`, but using the value types from `U` where their properties overlap.
   *
   * @internal
   */
  export type Overwrite<T, U> = (U extends ConsistentWith<U, T> ? T : Omit<T, keyof U>) & U;
}
