import type { Datatype } from "../../types.js";
import type { IONode } from "./common.js";

export type OutputNode<Type extends Datatype> = IONode<"output", Type>;
