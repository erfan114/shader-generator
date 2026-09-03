/**
 * A fixed-size tuple containing two values of the same type.
 *
 * `Vec2<T>` can be used to represent any pair of related values,
 * regardless of their underlying type.
 *
 * @template T The type of both values.
 *
 * @example
 * const position: Vec2<number> = [10, 20];
 * const flags: Vec2<boolean> = [true, false];
 */
export type Vec2<T> = [T, T];

/**
 * Creates a {@link Vec2} from two values.
 *
 * @template T The type of the values.
 * @param args The two values that make up the vector.
 * @returns A `Vec2` containing the provided values.
 *
 * @example
 * const position = vec2(10, 20);
 * // [10, 20]
 *
 * @example
 * const flags = vec2(true, false);
 * // [true, false]
 */
export function vec2<T>(...args: Vec2<T>): Vec2<T> {
  return args;
}
