function areComponentsEqual(a: React.ComponentType, b: React.ComponentType): boolean {
  return (a.displayName || a.name) === (b.displayName || b.name);
}

export default areComponentsEqual;
