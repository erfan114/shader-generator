import type { Datatype } from "../../types.js";
import type { BuilderNode } from "../node.js";

export type IONodeOptions<Type extends Datatype> = {
  name: string;
  type: Type;
  flatten?: boolean;
};

export type IONode<Kind extends string, Type extends Datatype> = BuilderNode<
  Kind,
  IONodeOptions<Type>
>;
