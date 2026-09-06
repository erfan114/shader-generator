import type { Vec3 } from "./vec3.structure.js";

/**
 * A 3×3 matrix represented as three rows of three values.
 *
 * `Matrix3<T>` is composed of three {@link Vec3} values, where each
 * `Vec3<T>` represents a row of the matrix.
 *
 * @template T The type of each matrix element.
 *
 * @example
 * const matrix: Matrix3<number> = [
 *   [1, 2, 3],
 *   [4, 5, 6],
 *   [7, 8, 9],
 * ];
 *
 * @example
 * const matrix: Matrix3<boolean> = [
 *   [true, false, false],
 *   [false, true, false],
 *   [false, false, true],
 * ];
 */
export type Matrix3<T> = Vec3<Vec3<T>>;

/**
 * Creates a {@link Matrix3} from nine scalar values.
 *
 * The values are arranged in row-major order:
 *
 * ```
 * [a1, a2, a3]
 * [a4, a5, a6]
 * [a7, a8, a9]
 * ```
 *
 * @template T The type of each matrix element.
 * @param args The nine values that make up the matrix.
 * @returns A `Matrix3` containing the provided values.
 *
 * @example
 * const matrix = matrix3(
 *   1, 2, 3,
 *   4, 5, 6,
 *   7, 8, 9,
 * );
 * // [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
 */
export function matrix3<T>(...args: [T, T, T, T, T, T, T, T, T]): Matrix3<T>;

/**
 * Creates a {@link Matrix3} from three {@link Vec3} rows.
 *
 * @template T The type of the matrix elements.
 * @param args The three rows that make up the matrix.
 * @returns A `Matrix3` containing the provided rows.
 *
 * @example
 * const matrix = matrix3(
 *   [1, 2, 3],
 *   [4, 5, 6],
 *   [7, 8, 9],
 * );
 * // [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
 */
export function matrix3<T>(...args: Matrix3<T>): Matrix3<T>;

export function matrix3<T>(
  ...args: Matrix3<T> | [T, T, T, T, T, T, T, T, T]
): Matrix3<T> {
  switch (args.length) {
    case 3:
      return args;
    case 9:
      return [
        [args[0], args[1], args[2]],
        [args[3], args[4], args[5]],
        [args[6], args[7], args[8]],
      ];
  }
}
