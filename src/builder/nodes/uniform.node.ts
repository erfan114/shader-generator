import type { Datatype } from "../../types.js";
import { type BuilderNode, builderNode } from "../node.js";

export type UniformNodeOptions<Type extends Datatype> = {
  type: Type;
};

export type UniformNodeStates = Partial<{
  name: string;
}>;

export type UniformNodeData<Type extends Datatype> = UniformNodeOptions<Type> &
  UniformNodeStates;

export type UniformNodeMethods<Type extends Datatype> = {
  as(alias: string): UniformNode<Type>;
};

export type UniformNode<Type extends Datatype = Datatype> = BuilderNode<
  "uniform",
  UniformNodeData<Type>,
  UniformNodeMethods<Type>
>;

export function uniform<Type extends Datatype>(
  options: UniformNodeOptions<Type>,
): UniformNode<Type> {
  const create = (data: UniformNodeData<Type>): UniformNode<Type> => {
    return builderNode<
      "uniform",
      UniformNodeOptions<Type>,
      UniformNodeMethods<Type>
    >({
      kind: "uniform",
      data,

      as(alias) {
        return create({
          ...data,
          name: alias,
        });
      },
    });
  };

  return create(options);
}
