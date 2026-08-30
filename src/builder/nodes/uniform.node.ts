import type { Datatype } from "../../types.js";
import type { GlobalOwnedNode } from "./global.node.js";

export type UniformNodeOptions<Type extends Datatype> = {
  name: string;
  type: Type;
};

export type UniformNode<Type extends Datatype> = GlobalOwnedNode<
  "uniform",
  UniformNodeOptions<Type>
>;
