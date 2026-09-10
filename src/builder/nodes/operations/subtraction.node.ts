import { builderNode } from "../../node.js";
import type { OperationNode } from "./common.js";
import type { AdditiveDatatype } from "./types/additive.type.js";

export const SUBTRACTION_KIND = "subtraction";

export type SubtractionNode<
  L extends AdditiveDatatype,
  R extends AdditiveDatatype,
> = OperationNode<typeof SUBTRACTION_KIND, L, R>;

export function subtract<
  L extends AdditiveDatatype,
  R extends AdditiveDatatype,
>(left: L, right: R): SubtractionNode<L, R> {
  return builderNode({
    kind: SUBTRACTION_KIND,
    data: {
      left,
      right,
    },
  });
}
