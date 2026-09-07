import { type BuilderNode, builderNode } from "../../node.js";
import type { ComparisonNode } from "./comparison.node.js";
import type { ValueNode } from "../value.node.js";
import type { VariableNode } from "../variable.node.js";
import { DATATYPE } from "@/types.js";

const LOGICAL_KIND = "logical";
const NOT_KIND = "not";

/**
 * Logical operators.
 */
export type LogicalOperator = "&&" | "||";

/**
 * A boolean expression - anything that evaluates to a BOOL result.
 *
 * This union includes:
 * - Comparison nodes (eq, neq, lt, lte, gt, gte)
 * - Logical nodes (and, or)
 * - Not nodes
 * - Boolean value nodes (ValueNode<BOOL>)
 * - Boolean variable nodes (VariableNode<BOOL>)
 */
export type BooleanExpression =
  | ComparisonNode
  | LogicalNode
  | NotNode
  | ValueNode<typeof DATATYPE.BOOL>
  | VariableNode<typeof DATATYPE.BOOL>;

/**
 * Logical AND node representing `a && b`.
 *
 * @template Left - Left operand (BooleanExpression)
 * @template Right - Right operand (BooleanExpression)
 */
export type LogicalNode = BuilderNode<
  typeof LOGICAL_KIND,
  {
    operator: LogicalOperator;
    left: BooleanExpression;
    right: BooleanExpression;
  }
>;

/**
 * Logical NOT node representing `!a`.
 */
export type NotNode = BuilderNode<
  typeof NOT_KIND,
  {
    value: BooleanExpression;
  }
>;

/**
 * Logical factories - produce boolean BuilderNode IR nodes.
 *
 * Each logical operation produces a node with kind "logical" or "not",
 * and an operator field, representing a GLSL logical expression.
 * The result type is always DATATYPE.BOOL.
 */

/** Logical AND (`a && b`) */
export function and(
  left: BooleanExpression,
  right: BooleanExpression,
): LogicalNode {
  return builderNode({
    kind: LOGICAL_KIND,
    data: { operator: "&&", left, right },
  });
}

/** Logical OR (`a || b`) */
export function or(
  left: BooleanExpression,
  right: BooleanExpression,
): LogicalNode {
  return builderNode({
    kind: LOGICAL_KIND,
    data: { operator: "||", left, right },
  });
}

/** Logical NOT (`!a`) */
export function not(
  value: BooleanExpression,
): NotNode {
  return builderNode({
    kind: NOT_KIND,
    data: { value },
  });
}
