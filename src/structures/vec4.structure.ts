/**
 * A fixed-size tuple containing four values of the same type.
 *
 * `Vec4<T>` can be used to represent any four related values,
 * regardless of their underlying type.
 *
 * @template T The type of all four values.
 *
 * @example
 * const color: Vec4<number> = [255, 128, 64, 255];
 * const flags: Vec4<boolean> = [true, false, true, false];
 */
export type Vec4<T> = [T, T, T, T];

/**
 * Creates a {@link Vec4} from four values.
 *
 * @template T The type of the values.
 * @param args The four values that make up the vector.
 * @returns A `Vec4` containing the provided values.
 *
 * @example
 * const color = vec4(255, 128, 64, 255);
 * // [255, 128, 64, 255]
 *
 * @example
 * const flags = vec4(true, false, true, false);
 * // [true, false, true, false]
 */
export function vec4<T>(...args: Vec4<T>): Vec4<T> {
  return args;
}
