import type { Vec3 } from "./vec3.structure.js";
import type { Vec4 } from "./vec4.structure.js";

/**
 * A 4×3 matrix represented as four rows of three values.
 *
 * `Matrix4x3<T>` is composed of four {@link Vec3} values, where each
 * `Vec3<T>` represents a row of the matrix.
 *
 * @template T The type of each matrix element.
 *
 * @example
 * const matrix: Matrix4x3<number> = [
 *   [1, 2, 3],
 *   [4, 5, 6],
 *   [7, 8, 9],
 *   [10, 11, 12],
 * ];
 *
 * @example
 * const matrix: Matrix4x3<boolean> = [
 *   [true, false, true],
 *   [false, true, false],
 *   [true, true, false],
 *   [false, false, true],
 * ];
 */
export type Matrix4x3<T> = Vec4<Vec3<T>>;

/**
 * Creates a {@link Matrix4x3} from twelve scalar values.
 *
 * The values are arranged in row-major order:
 *
 * ```
 * [a1,  a2,  a3 ]
 * [a4,  a5,  a6 ]
 * [a7,  a8,  a9 ]
 * [a10, a11, a12]
 * ```
 *
 * @template T The type of each matrix element.
 * @param args The twelve values that make up the matrix.
 * @returns A `Matrix4x3` containing the provided values.
 *
 * @example
 * const matrix = matrix4x3(
 *   1, 2, 3,
 *   4, 5, 6,
 *   7, 8, 9,
 *   10, 11, 12,
 * );
 * // [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]]
 */
export function matrix4x3<T>(
  ...args: [T, T, T, T, T, T, T, T, T, T, T, T]
): Matrix4x3<T>;

/**
 * Creates a {@link Matrix4x3} from four {@link Vec3} rows.
 *
 * @template T The type of each matrix element.
 * @param args The four rows that make up the matrix.
 * @returns A `Matrix4x3` containing the provided rows.
 *
 * @example
 * const matrix = matrix4x3(
 *   [1, 2, 3],
 *   [4, 5, 6],
 *   [7, 8, 9],
 *   [10, 11, 12],
 * );
 * // [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]]
 */
export function matrix4x3<T>(...args: Matrix4x3<T>): Matrix4x3<T>;

export function matrix4x3<T>(
  ...args: Matrix4x3<T> | [T, T, T, T, T, T, T, T, T, T, T, T]
): Matrix4x3<T> {
  switch (args.length) {
    case 4:
      return args;
    case 12:
      return [
        [args[0], args[1], args[2]],
        [args[3], args[4], args[5]],
        [args[6], args[7], args[8]],
        [args[9], args[10], args[11]],
      ];
  }
}
