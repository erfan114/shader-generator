/**
 * Creates a counter generator that yields the current count and optionally
 * advances it by a specified amount.
 *
 * The counter starts at `initial` (defaulting to `0`). Each call to
 * `next()` yields the current count. The value passed to `next(value)`
 * determines how much the counter is incremented.
 *
 * The count is clamped to `0`, so it can never become negative.
 *
 * - `next()` increments the counter by `1`.
 * - `next(value)` increments the counter by `value`.
 *
 * @param initial - The starting value of the counter. Defaults to `0`.
 * @returns A generator that yields the current count and accepts an
 * increment value.
 *
 * @example
 * ```ts
 * const counter = createCounter();
 *
 * counter.next().value;    // 0
 * counter.next().value;    // 1
 * counter.next(5).value;   // 6
 * counter.next().value;    // 7
 * ```
 *
 * @example
 * ```ts
 * const counter = createCounter(10);
 *
 * counter.next().value;    // 10
 * counter.next().value;    // 11
 * counter.next(5).value;   // 16
 * ```
 *
 * @example
 * ```ts
 * const counter = createCounter();
 *
 * counter.next().value;    // 0
 * counter.next(-5).value;  // 0
 * counter.next().value;    // 1
 * ```
 */
export function* createCounter(
  initial: number = 0,
): Generator<number, number, number> {
  let count = Math.max(0, initial);
  let addition = yield count;

  while (true) {
    count = Math.max(0, count + (addition ?? 1));
    addition = yield count;
  }
}
