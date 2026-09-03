import type { Vec2 } from "./vec2.structure.js";
import type { Vec3 } from "./vec3.structure.js";

/**
 * A 3×2 matrix represented as three rows of two values.
 *
 * `Matrix3x2<T>` is composed of three {@link Vec2} values, where each
 * `Vec2<T>` represents a row of the matrix.
 *
 * @template T The type of each matrix element.
 *
 * @example
 * const matrix: Matrix3x2<number> = [
 *   [1, 2],
 *   [3, 4],
 *   [5, 6],
 * ];
 *
 * @example
 * const matrix: Matrix3x2<boolean> = [
 *   [true, false],
 *   [false, true],
 *   [true, true],
 * ];
 */
export type Matrix3x2<T> = Vec3<Vec2<T>>;

/**
 * Creates a {@link Matrix3x2} from three rows.
 *
 * @template T The type of the matrix elements.
 * @param args The three rows that make up the matrix.
 * @returns A `Matrix3x2` containing the provided rows.
 *
 * @example
 * const matrix = matrix3x2(
 *   [1, 2],
 *   [3, 4],
 *   [5, 6],
 * );
 * // [[1, 2], [3, 4], [5, 6]]
 */
export function matrix3x2<T>(...args: Matrix3x2<T>): Matrix3x2<T> {
  return args;
}
