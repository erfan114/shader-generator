import type { Datatype } from "../../types.js";
import type { IONode } from "./common.js";

export type InputNode<Type extends Datatype> = IONode<"input", Type>;
