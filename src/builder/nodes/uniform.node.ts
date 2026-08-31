import type { Datatype } from "../../types.js";
import { NodeModel } from "../node.js";
import type { GlobalOwnedNode } from "./global.node.js";

export type UniformNodeOptions<Type extends Datatype> = {
  name: string;
  type: Type;
};

export type UniformNode<Type extends Datatype = Datatype> = GlobalOwnedNode<
  "uniform",
  UniformNodeOptions<Type>
>;

export class UniformNodeModel extends NodeModel<UniformNode> {}
