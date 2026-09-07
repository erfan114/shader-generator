import { builderNode } from "../../node.js";
import {
  COMPARISON_KIND,
  type ComparisonDatatype,
  type ComparisonNode,
  type ComparisonSide,
} from "./common.js";

export const NOT_EQUAL_OPERATOR = "!=";

export type NotEqualNode<Type extends ComparisonDatatype> = ComparisonNode<
  typeof NOT_EQUAL_OPERATOR,
  Type
>;

/** Not-equal comparison (`a != b`) */
export function neq<Type extends ComparisonDatatype>(
  left: ComparisonSide<Type>,
  right: ComparisonSide<Type>,
): NotEqualNode<Type> {
  return builderNode({
    kind: COMPARISON_KIND,
    data: {
      operator: NOT_EQUAL_OPERATOR,
      left,
      right,
    },
  });
}
