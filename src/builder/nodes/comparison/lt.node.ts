import { builderNode } from "../../node.js";
import {
  COMPARISON_KIND,
  type ComparisonDatatype,
  type ComparisonNode,
  type ComparisonSide,
} from "./common.js";

export const LESS_THAN_OPERATOR = "<";

export type LessThanNode<Type extends ComparisonDatatype> = ComparisonNode<
  typeof LESS_THAN_OPERATOR,
  Type
>;

/** Less-than comparison (`a < b`) */
export function lt<Type extends ComparisonDatatype>(
  left: ComparisonSide<Type>,
  right: ComparisonSide<Type>,
): LessThanNode<Type> {
  return builderNode({
    kind: COMPARISON_KIND,
    data: {
      operator: LESS_THAN_OPERATOR,
      left,
      right,
    },
  });
}
