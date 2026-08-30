import type { OperationNode } from "./common.js";
import type { AdditiveDatatype } from "./types/additive.type.js";

export type SubtractionNode<
  L extends AdditiveDatatype,
  R extends AdditiveDatatype,
> = OperationNode<"subtraction", L, R>;
