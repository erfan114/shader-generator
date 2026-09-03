import type { Vec2 } from "./vec2.structure.js";
import type { Vec3 } from "./vec3.structure.js";

/**
 * A 2×3 matrix represented as two rows of three values.
 *
 * `Matrix2x3<T>` is composed of two {@link Vec3} values, where each
 * `Vec3<T>` represents a row of the matrix.
 *
 * @template T The type of each matrix element.
 *
 * @example
 * const matrix: Matrix2x3<number> = [
 *   [1, 2, 3],
 *   [4, 5, 6],
 * ];
 *
 * @example
 * const matrix: Matrix2x3<boolean> = [
 *   [true, false, true],
 *   [false, true, false],
 * ];
 */
export type Matrix2x3<T> = Vec2<Vec3<T>>;

/**
 * Creates a {@link Matrix2x3} from two rows.
 *
 * @template T The type of the matrix elements.
 * @param args The two rows that make up the matrix.
 * @returns A `Matrix2x3` containing the provided rows.
 *
 * @example
 * const matrix = matrix2x3(
 *   [1, 2, 3],
 *   [4, 5, 6],
 * );
 * // [[1, 2, 3], [4, 5, 6]]
 */
export function matrix2x3<T>(...args: Matrix2x3<T>): Matrix2x3<T> {
  return args;
}
