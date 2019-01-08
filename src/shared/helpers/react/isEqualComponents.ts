export function isEqualComponents(a: React.ComponentType, b: React.ComponentType): boolean {
  return (a.displayName || a.name) === (b.displayName || b.name);
}
