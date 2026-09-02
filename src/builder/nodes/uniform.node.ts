import type { Datatype } from "../../types.js";
import { type BuilderNode, builderNode } from "../node.js";

const UNIFORM_KIND = "uniform";

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
  typeof UNIFORM_KIND,
  UniformNodeData<Type>,
  UniformNodeMethods<Type>
>;

export function uniform<Type extends Datatype>(
  options: UniformNodeOptions<Type>,
): UniformNode<Type> {
  const create = (data: UniformNodeData<Type>): UniformNode<Type> => {
    return builderNode<
      typeof UNIFORM_KIND,
      UniformNodeOptions<Type>,
      UniformNodeMethods<Type>
    >({
      kind: UNIFORM_KIND,
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
