import { builderNode } from "../../node.js";
import type { OperationNode } from "./common.js";
import type { MultiplicativeDatatype } from "./types/multiplicative.type.js";

export const MULTIPLICATION_KIND = "multiplication";

export type MultiplicationNode<
  L extends MultiplicativeDatatype,
  R extends MultiplicativeDatatype,
> = OperationNode<typeof MULTIPLICATION_KIND, L, R>;

export function multiply<
  L extends MultiplicativeDatatype,
  R extends MultiplicativeDatatype,
>(left: L, right: R): MultiplicationNode<L, R> {
  return builderNode({
    kind: MULTIPLICATION_KIND,
    data: { left, right },
  });
}
