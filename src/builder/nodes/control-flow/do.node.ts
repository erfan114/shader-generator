import type { BooleanExpression } from "../logical/common.js";

import type { ControlFlowBody } from "./common.js";

import { builderNode, type BuilderNode } from "@/builder/node.js";

export const DO_KIND = "do";

/**
 * Options used to construct a GLSL `do ... while` statement.
 *
 * @example
 * ```ts
 * do_({
 *   expression: condition,
 *   body: function* () {
 *     // statements executed before the condition is checked
 *   },
 * });
 * ```
 */
export type DoNodeOptions = {
  /**
   * Boolean expression that determines whether the loop continues.
   *
   * The body is executed first, then the expression is evaluated.
   * The loop continues while the expression evaluates to `true`.
   */
  expression: BooleanExpression;

  /**
   * Generator containing the statements executed by the loop body.
   *
   * The body is executed at least once before `expression` is evaluated.
   */
  body: ControlFlowBody;
};

/**
 * A typed builder node representing a GLSL `do ... while` statement.
 *
 * The node itself does not produce a value. It represents looping control
 * flow and can be yielded from a builder generator.
 *
 * @example
 * ```ts
 * yield* do_({
 *   expression: condition,
 *   body: function* () {
 *     // statements executed by the loop
 *   },
 * });
 * ```
 */
export type DoNode = BuilderNode<typeof DO_KIND, DoNodeOptions>;

/**
 * Creates a typed builder node representing a GLSL `do ... while` statement.
 *
 * Unlike a `while` loop, the body is executed once before the condition
 * is evaluated.
 *
 * @param options - Configuration for the `do ... while` loop.
 * @returns A typed `do ... while` statement node that can be yielded from
 * a builder generator.
 *
 * @example
 * ```ts
 * const condition = eq(
 *   value({
 *     type: DATATYPE.INT,
 *     data: 1,
 *   }),
 *   value({
 *     type: DATATYPE.INT,
 *     data: 1,
 *   }),
 * );
 *
 * yield* do_({
 *   expression: condition,
 *   body: function* () {
 *     // statements executed at least once
 *   },
 * });
 * ```
 */
export function do_(options: DoNodeOptions): DoNode {
  return builderNode({
    kind: DO_KIND,
    data: options,
  });
}
