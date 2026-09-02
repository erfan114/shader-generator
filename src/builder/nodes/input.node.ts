import type { Datatype } from "../../types.js";
import { type IONode, io } from "./common.js";

const INPUT_KIND = "input";

export type InputNode<Type extends Datatype> = IONode<typeof INPUT_KIND, Type>;

export const input = io(INPUT_KIND);
