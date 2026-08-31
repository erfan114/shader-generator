import type { Datatype } from "../../types.js";
import { NodeModel } from "../node.js";
import type { IONode } from "./common.js";

export type OutputNode<Type extends Datatype> = IONode<"output", Type>;

export class OutputNodeModel<Type extends Datatype> extends NodeModel<
  OutputNode<Type>
> {}
