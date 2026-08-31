import type { OperationNode } from "./common.js";
import type { MultiplicativeDatatype } from "./types/multiplicative.type.js";

export type DivisionNode<
  L extends MultiplicativeDatatype,
  R extends MultiplicativeDatatype,
> = OperationNode<"division", L, R>;

export function divide<
  L extends MultiplicativeDatatype,
  R extends MultiplicativeDatatype,
>(left: L, right: R): DivisionNode<L, R> {
  return {
    kind: "division",
    left,
    right,
  };
}
