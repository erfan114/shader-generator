import type { Datatype } from "../../types.js";
import { NodeModel } from "../node.js";
import type { GlobalOwnedNode } from "./global.node.js";

export type UniformNodeOptions<Type extends Datatype> = {
  name: string;
  type: Type;
};

export type UniformNode<Type extends Datatype> = GlobalOwnedNode<
  "uniform",
  UniformNodeOptions<Type>
>;

export class UniformNodeModel<Type extends Datatype> extends NodeModel<
  UniformNode<Type>
> {}
