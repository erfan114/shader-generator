import type { Datatype } from "../../types.js";
import { type IONode, io } from "./common.js";

const OUTPUT_KIND = "output";

export type OutputNode<Type extends Datatype> = IONode<
  typeof OUTPUT_KIND,
  Type
>;

export const output = io(OUTPUT_KIND);
