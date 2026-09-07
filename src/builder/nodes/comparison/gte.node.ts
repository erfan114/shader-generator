import { builderNode } from "../../node.js";
import {
  COMPARISON_KIND,
  type ComparisonDatatype,
  type ComparisonNode,
  type ComparisonSide,
} from "./common.js";

export const GREATER_THAN_EQUAL_OPERATOR = ">=";

export type GreaterThanEqualNode<Type extends ComparisonDatatype> =
  ComparisonNode<typeof GREATER_THAN_EQUAL_OPERATOR, Type>;

/** Greater-than-or-equal comparison (`a >= b`) */
export function gte<Type extends ComparisonDatatype>(
  left: ComparisonSide<Type>,
  right: ComparisonSide<Type>,
): GreaterThanEqualNode<Type> {
  return builderNode({
    kind: COMPARISON_KIND,
    data: {
      operator: GREATER_THAN_EQUAL_OPERATOR,
      left,
      right,
    },
  });
}
