import type { Datatype } from "../../types.js";
import { type BuilderNode, builderNode } from "../node.js";

export type UniformNodeOptions<Type extends Datatype> = {
  type: Type;
};

export type UniformNode<Type extends Datatype = Datatype> = BuilderNode<
  "uniform",
  UniformNodeOptions<Type>
>;

export function uniform<Type extends Datatype>(
  options: UniformNodeOptions<Type>,
): UniformNode<Type> {
  return builderNode({
    kind: "uniform",
    data: options,
  });
}
