import { builderNode } from "../../node.js";
import {
  COMPARISON_KIND,
  type ComparisonDatatype,
  type ComparisonNode,
  type ComparisonSide,
} from "./common.js";

export const GREATER_THAN_OPERATOR = ">";

export type GreaterThanNode<Type extends ComparisonDatatype> = ComparisonNode<
  typeof GREATER_THAN_OPERATOR,
  Type
>;

/** Greater-than comparison (`a > b`) */
export function gt<Type extends ComparisonDatatype>(
  left: ComparisonSide<Type>,
  right: ComparisonSide<Type>,
): GreaterThanNode<Type> {
  return builderNode({
    kind: COMPARISON_KIND,
    data: {
      operator: GREATER_THAN_OPERATOR,
      left,
      right,
    },
  });
}
