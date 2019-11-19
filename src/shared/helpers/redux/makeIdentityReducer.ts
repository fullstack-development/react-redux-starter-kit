function makeIdentityReducer<T = ''>(initial: T) {
  return (state: T = initial) => state;
}

export { makeIdentityReducer };
