import type { Datatype } from "../../types.js";
import type { BuilderNode } from "../node.js";

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
};

export type IONode<Kind extends string, Type extends Datatype> = BuilderNode<
  Kind,
  IONodeData<Type>,
  IONodeMethods<Kind, Type>
>;
