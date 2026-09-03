import type { Datatype } from "@/types.js";

import { type BuilderNode, builderNode } from "../node.js";

// * IO
export type IONodeOptions<Type extends Datatype> = {
  type: Type;
};

export type IONodeStates = Partial<{
  name: string;
  flatten: boolean;
}>;

export type IONodeData<Type extends Datatype> = IONodeOptions<Type> &
  IONodeStates;

export type IONodeMethods<Kind extends string, Type extends Datatype> = {
  as(alias: string): IONode<Kind, Type>;
  flat(): IONode<Kind, Type>;
};

export type IONode<Kind extends string, Type extends Datatype> = BuilderNode<
  Kind,
  IONodeData<Type>,
  IONodeMethods<Kind, Type>
>;

export function io<Kind extends string>(kind: Kind) {
  return <Type extends Datatype>(options: IONodeOptions<Type>) => {
    const create = (data: IONodeData<Type>): IONode<Kind, Type> => {
      return builderNode<Kind, IONodeOptions<Type>, IONodeMethods<Kind, Type>>({
        kind,
        data,

        as(alias) {
          return create({
            ...data,
            name: alias,
          });
        },
        flat() {
          return create({
            ...data,
            flatten: true,
          });
        },
      });
    };

    return create(options);
  };
}
