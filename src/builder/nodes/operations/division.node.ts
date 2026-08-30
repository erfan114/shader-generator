import type { OperationNode } from "./common.js";
import type { MultiplicativeDatatype } from "./types/multiplicative.type.js";

export type DivisionNode<
  L extends MultiplicativeDatatype,
  R extends MultiplicativeDatatype,
> = OperationNode<"division", L, R>;
