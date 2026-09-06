import type { Vec2 } from "./vec2.structure.js";
import type { Vec4 } from "./vec4.structure.js";

/**
 * A 4×2 matrix represented as four rows of two values.
 *
 * `Matrix4x2<T>` is composed of four {@link Vec2} values, where each
 * `Vec2<T>` represents a row of the matrix.
 *
 * @template T The type of each matrix element.
 *
 * @example
 * const matrix: Matrix4x2<number> = [
 *   [1, 2],
 *   [3, 4],
 *   [5, 6],
 *   [7, 8],
 * ];
 *
 * @example
 * const matrix: Matrix4x2<boolean> = [
 *   [true, false],
 *   [false, true],
 *   [true, true],
 *   [false, false],
 * ];
 */
export type Matrix4x2<T> = Vec4<Vec2<T>>;

/**
 * Creates a {@link Matrix4x2} from four rows of two values.
 *
 * @template T The type of each matrix element.
 * @param args The four rows that make up the matrix.
 * @returns A `Matrix4x2` containing the provided rows.
 *
 * @example
 * const matrix = matrix4x2(
 *   [1, 2],
 *   [3, 4],
 *   [5, 6],
 *   [7, 8],
 * );
 * // [[1, 2], [3, 4], [5, 6], [7, 8]]
 */
export function matrix4x2<T>(...args: Matrix4x2<T>): Matrix4x2<T>;

/**
 * Creates a {@link Matrix4x2} from eight scalar values.
 *
 * The values are arranged in row-major order:
 *
 * ```
 * [a1, a2]
 * [a3, a4]
 * [a5, a6]
 * [a7, a8]
 * ```
 *
 * @template T The type of each matrix element.
 * @param args The eight values that make up the matrix.
 * @returns A `Matrix4x2` containing the provided values.
 *
 * @example
 * const matrix = matrix4x2(
 *   1, 2,
 *   3, 4,
 *   5, 6,
 *   7, 8,
 * );
 * // [[1, 2], [3, 4], [5, 6], [7, 8]]
 */
export function matrix4x2<T>(...args: [T, T, T, T, T, T, T, T]): Matrix4x2<T>;

export function matrix4x2<T>(
  ...args: Matrix4x2<T> | [T, T, T, T, T, T, T, T]
): Matrix4x2<T> {
  switch (args.length) {
    case 4:
      return args;
    case 8:
      return [
        [args[0], args[1]],
        [args[2], args[3]],
        [args[4], args[5]],
        [args[6], args[7]],
      ];
  }
}
