/**
 * A fixed-size tuple containing two values of the same type.
 *
 * `Vec2<T>` can be used to represent a pair of related values,
 * such as a position, size, or pair of flags.
 *
 * @template T The type of both values.
 *
 * @example
 * const position: Vec2<number> = [10, 20];
 * const flags: Vec2<boolean> = [true, false];
 */
export type Vec2<T> = [T, T];

/**
 * Creates a {@link Vec2} from one or two values.
 *
 * When called with a single value, that value is used for both
 * components. When called with two values, each value is used
 * for its corresponding component.
 *
 * @template T The type of the values.
 * @param value The value to use for both components when a single
 * value is provided.
 * @returns A `Vec2` containing the provided values.
 *
 * @example
 * const position = vec2(10, 20);
 * // [10, 20]
 *
 * @example
 * const size = vec2(10);
 * // [10, 10]
 *
 * @example
 * const flags = vec2(true, false);
 * // [true, false]
 */
export function vec2<T>(value: T): Vec2<T>;
export function vec2<T>(x: T, y: T): Vec2<T>;
export function vec2<T>(...args: [T, T] | [T]): Vec2<T> {
  if (args.length === 1) {
    const value = args[0];

    return [value, value];
  }

  return args;
}

export function isVec2(value: unknown): value is Vec2<unknown> {
  return Array.isArray(value) && value.length === 2;
}
