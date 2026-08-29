export type ObjectValues<T extends object> = T[keyof T];

export function omit<T extends object, K extends keyof T>(
  target: T,
  keys: K[],
): Omit<T, K> {
  const result = { ...target };

  for (const key of keys) {
    delete result[key];
  }

  return result;
}
