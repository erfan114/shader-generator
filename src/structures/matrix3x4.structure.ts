import type { Vec3 } from "./vec3.structure.js";
import type { Vec4 } from "./vec4.structure.js";

/**
 * A 3×4 matrix represented as three rows of four values.
 *
 * `Matrix3x4<T>` is composed of three {@link Vec4} values, where each
 * `Vec4<T>` represents a row of the matrix.
 *
 * @template T The type of each matrix element.
 *
 * @example
 * const matrix: Matrix3x4<number> = [
 *   [1, 2, 3, 4],
 *   [5, 6, 7, 8],
 *   [9, 10, 11, 12],
 * ];
 *
 * @example
 * const matrix: Matrix3x4<boolean> = [
 *   [true, false, true, false],
 *   [false, true, false, true],
 *   [true, true, false, false],
 * ];
 */
export type Matrix3x4<T> = Vec3<Vec4<T>>;

/**
 * Creates a {@link Matrix3x4} from three rows.
 *
 * @template T The type of the matrix elements.
 * @param args The three rows that make up the matrix.
 * @returns A `Matrix3x4` containing the provided rows.
 *
 * @example
 * const matrix = matrix3x4(
 *   [1, 2, 3, 4],
 *   [5, 6, 7, 8],
 *   [9, 10, 11, 12],
 * );
 * // [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]
 */
export function matrix3x4<T>(...args: Matrix3x4<T>): Matrix3x4<T> {
  return args;
}
