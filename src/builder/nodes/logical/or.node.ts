import { builderNode } from "../../node.js";
import {
  LOGICAL_KIND,
  type BooleanExpression,
  type LogicalNode,
} from "./common.js";

export const OR_OPERATOR = "||";

export type OrNode = LogicalNode<typeof OR_OPERATOR>;

/** Logical OR (`a || b`) */
export function or(left: BooleanExpression, right: BooleanExpression): OrNode {
  return builderNode({
    kind: LOGICAL_KIND,
    data: {
      operator: OR_OPERATOR,
      left,
      right,
    },
  });
}
