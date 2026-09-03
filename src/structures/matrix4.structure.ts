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
 * Creates a {@link Matrix4} from four rows.
 *
 * @template T The type of the matrix elements.
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
export function matrix4<T>(...args: Matrix4<T>): Matrix4<T> {
  return args;
}
