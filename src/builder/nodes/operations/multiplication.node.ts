import { builderNode } from "../../node.js";
import type { OperationNode } from "./common.js";
import type { MultiplicativeDatatype } from "./types/multiplicative.type.js";

export type MultiplicationNode<
  L extends MultiplicativeDatatype,
  R extends MultiplicativeDatatype,
> = OperationNode<"multiplication", L, R>;

export function multiply<
  L extends MultiplicativeDatatype,
  R extends MultiplicativeDatatype,
>(left: L, right: R): MultiplicationNode<L, R> {
  return builderNode({
    kind: "multiplication",
    data: { left, right },
  });
}
