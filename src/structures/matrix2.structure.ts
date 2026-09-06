import type { Vec2 } from "./vec2.structure.js";

/**
 * A 2×2 matrix represented as two rows of two values.
 *
 * `Matrix2<T>` is composed of two {@link Vec2} values, where each
 * `Vec2<T>` represents a row of the matrix.
 *
 * @template T The type of each matrix element.
 *
 * @example
 * const matrix: Matrix2<number> = [
 *   [1, 2],
 *   [3, 4],
 * ];
 *
 * @example
 * const matrix: Matrix2<boolean> = [
 *   [true, false],
 *   [false, true],
 * ];
 */
export type Matrix2<T> = Vec2<Vec2<T>>;

/**
 * Creates a {@link Matrix2} from four scalar values.
 *
 * The values are arranged in row-major order:
 *
 * ```
 * [a1, a2]
 * [a3, a4]
 * ```
 *
 * @template T The type of the matrix elements.
 * @param args The four values that make up the matrix.
 * @returns A `Matrix2` containing the provided values.
 *
 * @example
 * const matrix = matrix2(1, 2, 3, 4);
 * // [[1, 2], [3, 4]]
 */
export function matrix2<T>(...args: [T, T, T, T]): Matrix2<T>;

/**
 * Creates a {@link Matrix2} from two {@link Vec2} rows.
 *
 * @template T The type of the matrix elements.
 * @param args The two rows that make up the matrix.
 * @returns A `Matrix2` containing the provided rows.
 *
 * @example
 * const matrix = matrix2(
 *   [1, 2],
 *   [3, 4],
 * );
 * // [[1, 2], [3, 4]]
 */
export function matrix2<T>(...args: Matrix2<T>): Matrix2<T>;
export function matrix2<T>(...args: Matrix2<T> | [T, T, T, T]): Matrix2<T> {
  switch (args.length) {
    case 2:
      return args;
    case 4:
      return [
        [args[0], args[1]],
        [args[2], args[3]],
      ];
  }
}
