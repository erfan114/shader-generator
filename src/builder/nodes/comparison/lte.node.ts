import { builderNode } from "../../node.js";
import {
  COMPARISON_KIND,
  type ComparisonDatatype,
  type ComparisonNode,
  type ComparisonSide,
} from "./common.js";

export const LESS_THAN_EQUAL_OPERATOR = "<=";

export type LessThanEqualNode<Type extends ComparisonDatatype> = ComparisonNode<
  typeof LESS_THAN_EQUAL_OPERATOR,
  Type
>;

/** Less-than-or-equal comparison (`a <= b`) */
export function lte<Type extends ComparisonDatatype>(
  left: ComparisonSide<Type>,
  right: ComparisonSide<Type>,
): LessThanEqualNode<Type> {
  return builderNode({
    kind: COMPARISON_KIND,
    data: {
      operator: LESS_THAN_EQUAL_OPERATOR,
      left,
      right,
    },
  });
}
