import { builderNode } from "../../node.js";
import {
  LOGICAL_KIND,
  type BooleanExpression,
  type LogicalNode,
} from "./common.js";

export const AND_OPERATOR = "&&";

/** Logical AND node representing `a && b`. */
export type AndNode = LogicalNode<typeof AND_OPERATOR>;

/** Logical AND (`a && b`) */
export function and(
  left: BooleanExpression,
  right: BooleanExpression,
): AndNode {
  return builderNode({
    kind: LOGICAL_KIND,
    data: {
      operator: AND_OPERATOR,
      left,
      right,
    },
  });
}
