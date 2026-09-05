import type { Vec2 } from "./vec2.structure.js";

/**
 * A fixed-size tuple containing three values of the same type.
 *
 * `Vec3<T>` can be used to represent a group of three related values,
 * such as a position, color, or set of flags.
 *
 * @template T The type of all three values.
 *
 * @example
 * const position: Vec3<number> = [10, 20, 30];
 * const flags: Vec3<boolean> = [true, false, true];
 */
export type Vec3<T> = [T, T, T];

/**
 * Creates a {@link Vec3} from one, two, or three values.
 *
 * When called with a single value, that value is used for all three
 * components.
 *
 * When called with a scalar and a {@link Vec2}, the scalar is combined
 * with the two components of the vector.
 *
 * When called with three scalar values, each value is used for its
 * corresponding component.
 *
 * @template T The type of the values.
 * @param args The values that make up the vector.
 * @returns A `Vec3` containing the provided values.
 *
 * @example
 * Create a vector from a single value:
 *
 * const size = vec3(10);
 * // [10, 10, 10]
 *
 * @example
 * Create a vector from three values:
 *
 * const position = vec3(10, 20, 30);
 * // [10, 20, 30]
 *
 * @example
 * Combine a scalar with a {@link Vec2}:
 *
 * const position = vec3(10, [20, 30]);
 * // [10, 20, 30]
 *
 * @example
 * Combine a {@link Vec2} with a scalar:
 *
 * const position = vec3([10, 20], 30);
 * // [10, 20, 30]
 *
 * @example
 * `vec3` works with any type:
 *
 * const flags = vec3(true, [false, true]);
 * // [true, false, true]
 */
export function vec3<T>(value: T): Vec3<T>;
export function vec3<T>(x: T, y: Vec2<T>): Vec3<T>;
export function vec3<T>(x: Vec2<T>, y: T): Vec3<T>;
export function vec3<T>(x: T, y: T, z: T): Vec3<T>;
export function vec3<T>(
  ...args: [T] | [T, Vec2<T>] | [Vec2<T>, T] | [T, T, T]
): Vec3<T> {
  if (args.length === 1) {
    const value = args[0];

    return [value, value, value];
  }

  if (args.length === 2) {
    const x = args[0];
    const y = args[1];

    if (Array.isArray(x) && !Array.isArray(y)) {
      return [...x, y];
    }

    if (!Array.isArray(x) && Array.isArray(y)) {
      return [x, ...y];
    }

    throw new TypeError(
      "vec3() with two arguments requires one scalar and one Vec2",
    );
  }

  return args;
}
