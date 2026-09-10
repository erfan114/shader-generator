import type { BooleanExpression } from "../logical/common.js";
import type { ControlFlowBody } from "./common.js";
import { builderNode, type BuilderNode } from "@/builder/node.js";

export const IF_KIND = "if";

/**
 * Options used to construct a GLSL `if` statement.
 *
 * @example
 * ```ts
 * if_({
 *   expression: eq(left, right),
 *   body: function* () {
 *     // statements executed when the expression is true
 *   },
 * });
 * ```
 */
export type IfNodeOptions = {
  /**
   * Boolean expression that determines whether the body is executed.
   *
   * The body is executed when the expression evaluates to `true`.
   */
  expression: BooleanExpression;

  /**
   * Generator containing the statements executed when the expression
   * evaluates to `true`.
   */
  body: ControlFlowBody;
};

/**
 * A typed builder node representing a GLSL `if` statement.
 *
 * The node itself does not produce a value. It represents conditional
 * control flow and can be yielded from a builder generator.
 *
 * @example
 * ```ts
 * yield* if_({
 *   expression: eq(left, right),
 *   body: function* () {
 *     // statements executed when the condition is true
 *   },
 * });
 * ```
 */
export type IfNode = BuilderNode<typeof IF_KIND, IfNodeOptions>;

/**
 * Creates a typed builder node representing a GLSL `if` statement.
 *
 * @param options - Configuration for the `if` statement.
 * @returns A typed `if` statement node that can be yielded from a
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
 * yield* if_({
 *   expression: condition,
 *   body: function* () {
 *     // statements executed when condition is true
 *   },
 * });
 * ```
 */
export function if_(options: IfNodeOptions): IfNode {
  return builderNode({
    kind: IF_KIND,
    data: options,
  });
}
