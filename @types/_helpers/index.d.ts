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

  export type GetProps<T extends React.ComponentType<any>> =
    T extends React.StatelessComponent<infer SP> ? SP :
    T extends React.ComponentClass<infer CP> ? CP : never;

  export type SubSet<T, R extends T> = R;

  export type MergeRight<L, R> = R & Pick<L, Exclude<keyof L, keyof R>>;

  type CheckExtends<T, R> = T extends R ? true : unknown;
  export type CheckIdentity<T, R> = (
    CheckExtends<T, R> | CheckExtends<R, T> | CheckExtends<keyof T, keyof R> | CheckExtends<keyof R, keyof T>
  ) extends true ? T : unknown;

  export type MarkAsPartial<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> & {
    [key in K]?: T[key];
  }

  export type MarkNotIdentityProps<T, R> = {
    [K in keyof T & keyof R]: CheckIdentity<T[K], R[K]>;
  }
}
