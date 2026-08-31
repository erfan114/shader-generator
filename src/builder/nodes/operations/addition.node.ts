import type { OperationNode } from "./common.js";
import type { AdditiveDatatype } from "./types/additive.type.js";

export type AdditionNode<
  L extends AdditiveDatatype,
  R extends AdditiveDatatype,
> = OperationNode<"addition", L, R>;

export function add<L extends AdditiveDatatype, R extends AdditiveDatatype>(
  left: L,
  right: R,
): AdditionNode<L, R> {
  return {
    kind: "addition",
    left,
    right,
  };
}
