import type { Datatype } from "../../types.js";
import { NodeModel } from "../node.js";
import type { IONode } from "./common.js";

export type InputNode<Type extends Datatype> = IONode<"input", Type>;

export class InputNodeModel<Type extends Datatype> extends NodeModel<
  InputNode<Type>
> {}
