import { createCounter } from "../counter.js";

export const NAME_GENERATOR_NAMING_PREFIX = "g_";
export const NAME_GENERATOR_DEFAULT_OFFSET = 1;

/**
 * Creates a generator that produces unique names using a hexadecimal counter.
 *
 * Names are prefixed with `g_` and generated sequentially from `0`.
 * The offset determines how far the counter advances before generating
 * the next name.
 *
 * By default, the counter advances by `1` for each name. A custom offset
 * can be provided through `next(value)`.
 *
 * @returns A generator that yields generated names and accepts an optional
 * offset for the next name.
 *
 * @example
 * ```ts
 * const names = createNameGenerator();
 *
 * names.next().value;    // "g_0"
 * names.next().value;    // "g_1"
 * names.next().value;    // "g_2"
 * ```
 *
 * @example
 * ```ts
 * const names = createNameGenerator();
 *
 * names.next().value;    // "g_0"
 * names.next(5).value;   // "g_1"
 * names.next().value;    // "g_6"
 * ```
 *
 * @example
 * ```ts
 * const names = createNameGenerator();
 *
 * names.next().value;    // "g_0"
 * names.next(15).value;  // "g_1"
 * names.next().value;    // "g_10"
 * ```
 */
export function* createNameGenerator(): Generator<
  string,
  string,
  number | undefined
> {
  const counter = createCounter();

  let offset = NAME_GENERATOR_DEFAULT_OFFSET;

  while (true) {
    const count = counter.next(offset).value;
    const name = `${NAME_GENERATOR_NAMING_PREFIX}${count.toString(16)}`;

    const requestedOffset = yield name;

    offset = requestedOffset ?? NAME_GENERATOR_DEFAULT_OFFSET;
  }
}
