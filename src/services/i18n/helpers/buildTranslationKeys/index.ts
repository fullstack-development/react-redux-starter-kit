export interface ITranslateKey {
  getKey(): string;
}

export interface IConcatKey {
  concat(key: string): string;
}

interface ITree extends Record<string, ITree | string> { }

type TranslationKeysTree<T> = {
  [key in keyof T]:
  T[key] extends Record<string, string> ? TranslationKeysTree<T[key]> & IConcatKey :
  T[key] extends ITree ? TranslationKeysTree<T[key]> :
  T[key] extends string ? ITranslateKey :
  never;
};

export default function buildTranslationKeys<T extends ITree>(messagesTree: T): TranslationKeysTree<T> {
  return (function loop(tree: T, path: string[] = []): TranslationKeysTree<T> {
    return Object
      .keys(tree)
      .map(key => [key, tree[key]])
      .reduce<TranslationKeysTree<T>>((acc: TranslationKeysTree<T>, [key, value]: [string, T]) => {
        const xPath = [...path, key];

        const routeData: ITranslateKey & IConcatKey = {
          getKey: () => xPath.join('.'),
          concat: (_key: string) => xPath.concat(_key).join('.'),
        };
        if (typeof value === 'string') {
          return { ...(acc as any), [key]: routeData };
        }
        return {
          ...(acc as any),
          [key]: {
            ...(loop(value, xPath) as any),
            ...routeData,
          },
        };
      }, {} as TranslationKeysTree<T>);
  })(messagesTree);
}
