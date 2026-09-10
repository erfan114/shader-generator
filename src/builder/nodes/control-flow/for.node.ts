import type { BooleanExpression } from "../logical/common.js";
import { builderNode, type BuilderNode } from "@/builder/node.js";
import type { ValueNode, InferValueType } from "../value.node.js";
import type { VariableNode } from "../variable.node.js";
import type { OperationNode } from "../operations/common.js";
import type { DATATYPE } from "@/types.js";

export const FOR_KIND = "for";

export type ForNodeInit = ValueNode<typeof DATATYPE.INT> | null;

export type ForNodeArgs<T extends ForNodeInit> = T extends null
  ? []
  : T extends ValueNode
    ? [VariableNode<InferValueType<T>>]
    : never;

export type ForNodeBody<T extends ForNodeInit> = (
  ...args: ForNodeArgs<T>
) => Generator<unknown, void>;

export type ForNodeOptions<Init extends ForNodeInit> = {
  /**
   * Initialization expression executed once before the first iteration.
   *
   * When provided, its value determines the type of the loop variable
   * passed to `condition`, `update`, and `body`.
   *
   * Use `null` when the loop does not declare or initialize a loop variable.
   *
   * @example
   * ```ts
   * init: value({ type: DATATYPE.INT, data: 0 })
   * ```
   */
  init: Init;

  /**
   * Condition evaluated before each iteration.
   *
   * The loop continues while the expression evaluates to `true`.
   *
   * When `init` is not `null`, the loop variable is passed to the callback.
   */
  condition: (...args: ForNodeArgs<Init>) => BooleanExpression;

  /**
   * Update expression executed after each iteration.
   *
   * Typically used to advance or otherwise update the loop variable,
   * such as `i++` or `i += 2`.
   */
  update: (...args: ForNodeArgs<Init>) => OperationNode;

  /**
   * Generator containing the statements executed on each iteration.
   *
   * When `init` is not `null`, the loop variable is passed to the generator.
   */
  body: ForNodeBody<NoInfer<Init>>;
};

/**
 * A typed builder node representing a GLSL `for` statement.
 *
 * The callback parameters are inferred from the initialization expression:
 *
 * - `init: null` — callbacks receive no arguments.
 * - `init: ValueNode<T>` — callbacks receive a
 *   `VariableNode<InferValueType<T>>`.
 *
 * @example
 * ```ts
 * const i = value({
 *   type: DATATYPE.INT,
 *   data: 0,
 * });
 *
 * yield* for_({
 *   init: i,
 *   condition: (i) =>
 *     lt(i, value({ type: DATATYPE.INT, data: 10 })),
 *   update: (i) => i.assign(add(i, 1)),
 *   body: function* (i) {
 *     // loop body
 *   },
 * });
 * ```
 *
 * @example
 * ```ts
 * yield* for_({
 *   init: null,
 *   condition: () => someCondition,
 *   update: () => someOperation,
 *   body: function* () {
 *     // loop body
 *   },
 * });
 * ```
 */
export type ForNode<Init extends ForNodeInit> = BuilderNode<
  typeof FOR_KIND,
  ForNodeOptions<Init>
>;

/**
 * Creates a typed builder node representing a GLSL `for` statement.
 *
 * The callback parameters are inferred from `options.init`, allowing
 * the loop variable to be used consistently in the condition, update,
 * and body.
 *
 * @param options - Configuration for the `for` loop.
 * @returns A typed `for` loop node that can be yielded from a builder generator.
 *
 * @example
 * ```ts
 * const i = value({
 *   type: DATATYPE.INT,
 *   data: 0,
 * });
 *
 * yield* for_({
 *   init: i,
 *   condition: (i) =>
 *     lt(i, value({ type: DATATYPE.INT, data: 10 })),
 *   update: (i) => i.assign(add(i, 1)),
 *   body: function* (i) {
 *     // statements executed on each iteration
 *   },
 * });
 * ```
 */
export function for_<Init extends ForNodeInit>(
  options: ForNodeOptions<Init>,
): ForNode<Init> {
  return builderNode({
    kind: FOR_KIND,
    data: options,
  });
}
