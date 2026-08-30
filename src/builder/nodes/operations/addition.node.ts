import type { OperationNode } from "./common.js";
import type { AdditiveDatatype } from "./types/additive.type.js";

export type AdditionNode<
  L extends AdditiveDatatype,
  R extends AdditiveDatatype,
> = OperationNode<"addition", L, R>;
