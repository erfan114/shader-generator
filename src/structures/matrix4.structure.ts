import type { Vec4 } from "./vec4.structure.js";

/**
 * A 4×4 matrix represented as four rows of four values.
 *
 * `Matrix4<T>` is composed of four {@link Vec4} values, where each
 * `Vec4<T>` represents a row of the matrix.
 *
 * @template T The type of each matrix element.
 *
 * @example
 * const matrix: Matrix4<number> = [
 *   [1, 2, 3, 4],
 *   [5, 6, 7, 8],
 *   [9, 10, 11, 12],
 *   [13, 14, 15, 16],
 * ];
 *
 * @example
 * const matrix: Matrix4<boolean> = [
 *   [true, false, false, false],
 *   [false, true, false, false],
 *   [false, false, true, false],
 *   [false, false, false, true],
 * ];
 */
export type Matrix4<T> = Vec4<Vec4<T>>;

/**
 * Creates a {@link Matrix4} from sixteen scalar values.
 *
 * The values are arranged in row-major order:
 *
 * ```
 * [a1,  a2,  a3,  a4 ]
 * [a5,  a6,  a7,  a8 ]
 * [a9,  a10, a11, a12]
 * [a13, a14, a15, a16]
 * ```
 *
 * @template T The type of each matrix element.
 * @param args The sixteen values that make up the matrix.
 * @returns A `Matrix4` containing the provided values.
 *
 * @example
 * const matrix = matrix4(
 *   1, 2, 3, 4,
 *   5, 6, 7, 8,
 *   9, 10, 11, 12,
 *   13, 14, 15, 16,
 * );
 * // [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]
 */
export function matrix4<T>(
  ...args: [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T]
): Matrix4<T>;

/**
 * Creates a {@link Matrix4} from four {@link Vec4} rows.
 *
 * @template T The type of each matrix element.
 * @param args The four rows that make up the matrix.
 * @returns A `Matrix4` containing the provided rows.
 *
 * @example
 * const matrix = matrix4(
 *   [1, 2, 3, 4],
 *   [5, 6, 7, 8],
 *   [9, 10, 11, 12],
 *   [13, 14, 15, 16],
 * );
 * // [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]
 */
export function matrix4<T>(...args: Matrix4<T>): Matrix4<T>;

export function matrix4<T>(
  ...args: Matrix4<T> | [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T]
): Matrix4<T> {
  switch (args.length) {
    case 4:
      return args;
    case 16:
      return [
        [args[0], args[1], args[2], args[3]],
        [args[4], args[5], args[6], args[7]],
        [args[8], args[9], args[10], args[11]],
        [args[12], args[13], args[14], args[15]],
      ];
  }
}
