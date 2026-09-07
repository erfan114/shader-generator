import type { DATATYPE } from "@/types.js";
import type { ValueNode } from "../value.node.js";
import type { VariableNode } from "../variable.node.js";
import type { ComparisonNode } from "../comparison/common.js";
import type { BuilderNode } from "@/builder/node.js";

/** Boolean expression - a node structure that produces a BOOL result. */
export type BooleanExpression =
  | ComparisonNode
  | ValueNode<typeof DATATYPE.BOOL>
  | VariableNode<typeof DATATYPE.BOOL>;

export const LOGICAL_KIND = "logical";

export type LogicalNode<Operator extends string = string> = BuilderNode<
  typeof LOGICAL_KIND,
  { operator: Operator; left: BooleanExpression; right: BooleanExpression }
>;
