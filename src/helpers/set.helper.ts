export function returnAdd<T>(to: Set<T>, item: T) {
  to.add(item);

  return item;
}
