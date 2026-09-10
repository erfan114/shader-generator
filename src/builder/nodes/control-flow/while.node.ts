import type { BooleanExpression } from "../logical/common.js";

import type { ControlFlowBody } from "./common.js";

import { builderNode, type BuilderNode } from "@/builder/node.js";

export const WHILE_KIND = "while";

/**
 * Options used to construct a GLSL `while` statement.
 *
 * @example
 * ```ts
 * while_({
 *   expression: condition,
 *   body: function* () {
 *     // statements executed while the condition is true
 *   },
 * });
 * ```
 */
export type WhileNodeOptions = {
  /**
   * Boolean expression that determines whether the loop body is executed.
   *
   * The expression is evaluated before each iteration. The body is executed
   * only while the expression evaluates to `true`.
   */
  expression: BooleanExpression;

  /**
   * Generator containing the statements executed by the loop body.
   */
  body: ControlFlowBody;
};

/**
 * A typed builder node representing a GLSL `while` statement.
 *
 * The node itself does not produce a value. It represents looping control
 * flow and can be yielded from a builder generator.
 *
 * @example
 * ```ts
 * yield* while_({
 *   expression: condition,
 *   body: function* () {
 *     // statements executed while the condition is true
 *   },
 * });
 * ```
 */
export type WhileNode = BuilderNode<typeof WHILE_KIND, WhileNodeOptions>;

/**
 * Creates a typed builder node representing a GLSL `while` statement.
 *
 * The condition is evaluated before each iteration, so the body may not
 * execute if the expression initially evaluates to `false`.
 *
 * @param options - Configuration for the `while` loop.
 * @returns A typed `while` statement node that can be yielded from a
 * builder generator.
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
 * yield* while_({
 *   expression: condition,
 *   body: function* () {
 *     // statements executed while condition is true
 *   },
 * });
 * ```
 */
export function while_(options: WhileNodeOptions): WhileNode {
  return builderNode({
    kind: WHILE_KIND,
    data: options,
  });
}
