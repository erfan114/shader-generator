import { type BuilderNode, builderNode } from "../../node.js";
import type { BooleanExpression } from "./common.js";

export const NOT_KIND = "not";

/** Logical NOT node representing `!a` */
export type NotNode = BuilderNode<
  typeof NOT_KIND,
  {
    value: BooleanExpression;
  }
>;

/** Logical NOT (`!a`) */
export function not(value: BooleanExpression): NotNode {
  return builderNode({
    kind: NOT_KIND,
    data: {
      value,
    },
  });
}
