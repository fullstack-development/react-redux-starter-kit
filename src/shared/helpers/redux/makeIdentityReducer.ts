export default function makeIdentityReducer<T = ''>(initial: T) {
  return (state: T = initial) => state;
}
