import { DATATYPE } from "@/types.js";
import { builderNode, type BuilderNode } from "@/builder/node.js";
import type { ValueNode } from "../value.node.js";
import type { VariableNode } from "../variable.node.js";
import type { ControlFlowBody } from "./common.js";

export const SWITCH_KIND = "switch";

/**
 * Datatypes supported by a GLSL `switch` expression.
 *
 * GLSL switch statements operate on integral scalar values, so only
 * `int` and `uint` are supported.
 */
export type SwitchDatatype = typeof DATATYPE.UINT | typeof DATATYPE.INT;

/**
 * An expression used as the selector of a switch statement.
 *
 * The expression must evaluate to an `int` or `uint` scalar value.
 */
export type SwitchExpression =
  ValueNode<SwitchDatatype> | VariableNode<SwitchDatatype>;

/**
 * A single case in a switch statement.
 *
 * The case value must be an integral constant represented by a
 * `ValueNode`. The body contains the statements executed when
 * the switch expression matches the case value.
 */
export type SwitchCase = {
  /**
   * Integral constant used to match the switch expression.
   */
  value: ValueNode<SwitchDatatype>;

  /**
   * Statements executed when the case matches.
   */
  body: ControlFlowBody;
};

/**
 * Options used to construct a GLSL `switch` statement.
 *
 * @example
 * ```ts
 * switch_({
 *   expression: mode,
 *   cases: [
 *     {
 *       value: value({
 *         type: DATATYPE.INT,
 *         data: 0,
 *       }),
 *       body: function* () {
 *         // statements for case 0
 *       },
 *     },
 *     {
 *       value: value({
 *         type: DATATYPE.INT,
 *         data: 1,
 *       }),
 *       body: function* () {
 *         // statements for case 1
 *       },
 *     },
 *   ],
 *   defaultCase: function* () {
 *     // statements for the default case
 *   },
 * });
 * ```
 */
export type SwitchNodeOptions = {
  /**
   * Expression whose value determines which case is executed.
   *
   * Must evaluate to an `int` or `uint` scalar value.
   */
  expression: SwitchExpression;

  /**
   * Cases evaluated against the switch expression.
   *
   * Each case contains an integral constant and a generator
   * containing the statements executed when that value matches
   * the expression.
   */
  cases: SwitchCase[];

  /**
   * Optional generator containing the statements executed when none
   * of the cases match the switch expression.
   *
   * When omitted, no `default` case is generated.
   */
  defaultCase?: ControlFlowBody;
};

/**
 * A typed builder node representing a GLSL `switch` statement.
 *
 * The node itself does not produce a value. It represents control flow
 * and can be yielded from a shader builder generator.
 *
 * @example
 * ```ts
 * yield* switch_({
 *   expression: mode,
 *   cases: [
 *     {
 *       value: value({
 *         type: DATATYPE.INT,
 *         data: 0,
 *       }),
 *       body: function* () {
 *         // case 0
 *       },
 *     },
 *   ],
 * });
 * ```
 */
export type SwitchNode = BuilderNode<typeof SWITCH_KIND, SwitchNodeOptions>;

/**
 * Creates a typed builder node representing a GLSL `switch` statement.
 *
 * @param options - Configuration for the switch statement.
 * @returns A typed switch statement node that can be yielded from a
 * builder generator.
 *
 * @example
 * ```ts
 * const mode = variable({
 *   type: DATATYPE.INT,
 *   name: "mode",
 * });
 *
 * yield* switch_({
 *   expression: mode,
 *   cases: [
 *     {
 *       value: value({
 *         type: DATATYPE.INT,
 *         data: 0,
 *       }),
 *       body: function* () {
 *         // statements executed for case 0
 *       },
 *     },
 *     {
 *       value: value({
 *         type: DATATYPE.INT,
 *         data: 1,
 *       }),
 *       body: function* () {
 *         // statements executed for case 1
 *       },
 *     },
 *   ],
 *   defaultCase: function* () {
 *     // statements executed when no case matches
 *   },
 * });
 * ```
 */
export function switch_(options: SwitchNodeOptions): SwitchNode {
  return builderNode({
    kind: SWITCH_KIND,
    data: options,
  });
}
