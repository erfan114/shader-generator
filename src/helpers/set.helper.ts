export function addToSet<T>(to: Set<T>, item: T) {
  to.add(item);

  return item;
}
