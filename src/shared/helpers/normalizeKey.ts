function normalizeKey<T extends { [key: string]: any }>(object: T, key: string): T {
  if (key.indexOf('_') < 0) {
    return object;
  }

  const normalizedKey = key
    .split('_')
    .map((k: string, index: number) => index > 0 ? `${k[0].toUpperCase()}${k.substr(1)}` : k)
    .join('');

  object[normalizedKey] = object[key];
  delete object[key];

  return object;
}

export default normalizeKey;
