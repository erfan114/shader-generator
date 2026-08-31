import type { Datatype } from "../../types.js";
import { NodeModel } from "../node.js";
import type { IONode } from "./common.js";

export type OutputNode<Type extends Datatype = Datatype> = IONode<
  "output",
  Type
>;

export class OutputNodeModel extends NodeModel<OutputNode> {}
