import { type Vec2, isVec2 } from "./vec2.structure.js";
import { type Vec3, isVec3 } from "./vec3.structure.js";

/**
 * A fixed-size tuple containing four values of the same type.
 *
 * `Vec4<T>` can be used to represent a group of four related values,
 * such as a color, position, quaternion, or set of flags.
 *
 * @template T The type of all four values.
 *
 * @example
 * const color: Vec4<number> = [255, 128, 64, 255];
 * const flags: Vec4<boolean> = [true, false, true, false];
 */
export type Vec4<T> = [T, T, T, T];

/**
 * Creates a {@link Vec4} from one or more values or vectors.
 *
 * A single value is replicated across all four components.
 *
 * A {@link Vec3} can be combined with a scalar, with the scalar
 * placed before or after the vector.
 *
 * Two {@link Vec2} values can be combined to form the four components.
 *
 * A {@link Vec2} can also be combined with two scalar values, with
 * the vector placed at the beginning, middle, or end.
 *
 * Finally, four scalar values can be provided directly.
 *
 * @template T The type of the values.
 * @param args The values or vectors that make up the vector.
 * @returns A `Vec4` containing the provided values.
 *
 * @example
 * Create a vector from a single value:
 *
 * const value = vec4(10);
 * // [10, 10, 10, 10]
 *
 * @example
 * Create a vector from four values:
 *
 * const color = vec4(255, 128, 64, 255);
 * // [255, 128, 64, 255]
 *
 * @example
 * Combine a scalar with a {@link Vec3}:
 *
 * const position = vec4(10, [20, 30, 40]);
 * // [10, 20, 30, 40]
 *
 * @example
 * Combine a {@link Vec3} with a scalar:
 *
 * const position = vec4([10, 20, 30], 40);
 * // [10, 20, 30, 40]
 *
 * @example
 * Combine two {@link Vec2} values:
 *
 * const position = vec4([10, 20], [30, 40]);
 * // [10, 20, 30, 40]
 *
 * @example
 * Combine two scalar values with a {@link Vec2}:
 *
 * const position = vec4(10, 20, [30, 40]);
 * // [10, 20, 30, 40]
 *
 * @example
 * Place a {@link Vec2} between two scalar values:
 *
 * const position = vec4(10, [20, 30], 40);
 * // [10, 20, 30, 40]
 *
 * @example
 * Place a {@link Vec2} before two scalar values:
 *
 * const position = vec4([10, 20], 30, 40);
 * // [10, 20, 30, 40]
 *
 * @example
 * `vec4` works with any type:
 *
 * const flags = vec4(true, [false, true], false);
 * // [true, false, true, false]
 */
export function vec4<T>(value: T): Vec4<T>;
export function vec4<T>(x: T, y: Vec3<T>): Vec4<T>;
export function vec4<T>(x: Vec3<T>, y: T): Vec4<T>;
export function vec4<T>(x: Vec2<T>, y: Vec2<T>): Vec4<T>;
export function vec4<T>(x: T, y: T, z: Vec2<T>): Vec4<T>;
export function vec4<T>(x: T, y: Vec2<T>, z: T): Vec4<T>;
export function vec4<T>(x: Vec2<T>, y: T, z: T): Vec4<T>;
export function vec4<T>(x: T, y: T, z: T, w: T): Vec4<T>;
export function vec4<T>(
  ...args:
    | [T]
    | [T, Vec3<T>]
    | [Vec3<T>, T]
    | [Vec2<T>, Vec2<T>]
    | [T, T, Vec2<T>]
    | [T, Vec2<T>, T]
    | [Vec2<T>, T, T]
    | [T, T, T, T]
): Vec4<T> {
  switch (args.length) {
    case 1:
      return [args[0], args[0], args[0], args[0]];
    case 2:
      return fromTwoArgs(args);
    case 3:
      return fromThreeArgs(args);
    default:
      return args;
  }
}

function fromTwoArgs<T>(
  args: [T, Vec3<T>] | [Vec3<T>, T] | [Vec2<T>, Vec2<T>],
): Vec4<T> {
  const [x, y] = args;

  if (!Array.isArray(x) && isVec3(y)) return [x, ...y];
  if (isVec3(x) && !Array.isArray(y)) return [...x, y];
  if (isVec2(x) && isVec2(y)) return [...x, ...y];

  throw new TypeError(
    "vec4() with two arguments requires either 'one scalar and one Vec3' or 'two Vec2'",
  );
}

function fromThreeArgs<T>(
  args: [T, T, Vec2<T>] | [T, Vec2<T>, T] | [Vec2<T>, T, T],
): Vec4<T> {
  const [x, y, z] = args;

  if (!Array.isArray(x) && !Array.isArray(y) && isVec2(z)) return [x, y, ...z];
  if (!Array.isArray(x) && isVec2(y) && !Array.isArray(z)) return [x, ...y, z];
  if (isVec2(x) && !Array.isArray(y) && !Array.isArray(z)) return [...x, y, z];

  throw new TypeError(
    "vec4() with three arguments requires two scalar and one Vec2",
  );
}

export function isVec4(value: unknown): value is Vec4<unknown> {
  return Array.isArray(value) && value.length === 4;
}
