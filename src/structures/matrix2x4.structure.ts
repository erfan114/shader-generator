import type { Vec2 } from "./vec2.structure.js";
import type { Vec4 } from "./vec4.structure.js";

/**
 * A 2×4 matrix represented as two rows of four values.
 *
 * `Matrix2x4<T>` is composed of two {@link Vec4} values, where each
 * `Vec4<T>` represents a row of the matrix.
 *
 * @template T The type of each matrix element.
 *
 * @example
 * const matrix: Matrix2x4<number> = [
 *   [1, 2, 3, 4],
 *   [5, 6, 7, 8],
 * ];
 *
 * @example
 * const matrix: Matrix2x4<boolean> = [
 *   [true, false, true, false],
 *   [false, true, false, true],
 * ];
 */
export type Matrix2x4<T> = Vec2<Vec4<T>>;

/**
 * Creates a {@link Matrix2x4} from two rows.
 *
 * @template T The type of the matrix elements.
 * @param args The two rows that make up the matrix.
 * @returns A `Matrix2x4` containing the provided rows.
 *
 * @example
 * const matrix = matrix2x4(
 *   [1, 2, 3, 4],
 *   [5, 6, 7, 8],
 * );
 * // [[1, 2, 3, 4], [5, 6, 7, 8]]
 */
export function matrix2x4<T>(...args: Matrix2x4<T>): Matrix2x4<T> {
  return args;
}
