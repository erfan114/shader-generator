export type ObjectValues<T extends object> = T[keyof T];

export function values<T extends object>(target: T) {
  return Object.values(target) as ObjectValues<T>[];
}

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

export function valuesInclude<T extends object>(
  target: T,
  key: unknown,
): key is ObjectValues<T> {
  const objectValues = values(target);

  return objectValues.includes(key as ObjectValues<T>);
}
