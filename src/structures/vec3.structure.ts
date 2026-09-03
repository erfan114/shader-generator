/**
 * A fixed-size tuple containing three values of the same type.
 *
 * `Vec3<T>` can be used to represent any three related values,
 * regardless of their underlying type.
 *
 * @template T The type of all three values.
 *
 * @example
 * const position: Vec3<number> = [10, 20, 30];
 * const flags: Vec3<boolean> = [true, false, true];
 */
export type Vec3<T> = [T, T, T];

/**
 * Creates a {@link Vec3} from three values.
 *
 * @template T The type of the values.
 * @param args The three values that make up the vector.
 * @returns A `Vec3` containing the provided values.
 *
 * @example
 * const position = vec3(10, 20, 30);
 * // [10, 20, 30]
 *
 * @example
 * const flags = vec3(true, false, true);
 * // [true, false, true]
 */
export function vec3<T>(...args: Vec3<T>): Vec3<T> {
  return args;
}
