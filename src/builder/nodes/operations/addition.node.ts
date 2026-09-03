import { builderNode } from "../../node.js";
import type { ValueNode } from "../value.node.js";
import type { VariableNode } from "../variable.node.js";
import type { OperationNode } from "./common.js";
import type { AdditiveDatatype } from "./types/additive.type.js";

export type AdditionSide<Type extends AdditiveDatatype> =
  ValueNode<Type> | VariableNode<Type>;

export type AdditionNode<
  L extends AdditiveDatatype,
  R extends AdditiveDatatype,
> = OperationNode<"addition", AdditionSide<L>, AdditionSide<R>>;

export function add<L extends AdditiveDatatype, R extends AdditiveDatatype>(
  left: AdditionSide<L>,
  right: AdditionSide<R>,
): AdditionNode<L, R> {
  return builderNode({
    kind: "addition",
    data: {
      left,
      right,
    },
  });
}
