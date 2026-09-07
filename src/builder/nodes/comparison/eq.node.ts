import { builderNode } from "../../node.js";
import {
  COMPARISON_KIND,
  type ComparisonDatatype,
  type ComparisonNode,
  type ComparisonSide,
} from "./common.js";

export const EQUAL_OPERATOR = "==";

export type EqualNode<Type extends ComparisonDatatype> = ComparisonNode<
  typeof EQUAL_OPERATOR,
  Type
>;

/** Equal comparison (`a == b`) */
export function eq<Type extends ComparisonDatatype>(
  left: ComparisonSide<Type>,
  right: ComparisonSide<Type>,
): EqualNode<Type> {
  return builderNode({
    kind: COMPARISON_KIND,
    data: {
      operator: EQUAL_OPERATOR,
      left,
      right,
    },
  });
}
